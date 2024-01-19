// Packages
import { useEffect, useState } from 'react'
import { 
  Avatar,
  Box, Grid, IconButton, InputLabel, Link, ListItemText, Typography
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik, useFormikContext, useField, Formik } from 'formik';

// Utitilities
import { useHooks } from '.'
import { 
  cap_first, 
  calculators, 
  formatHeightToNumber,
  generateFields, 
  tryCatchHandler 
} from '../utilities/helpers'
import { validationSchema } from '../utilities/validations';


// Hook: useSubmit() - handles all form submissions
export const useSubmit = () => {
  // Hooks
  const hooks = useHooks()

  // !handleSubmit should handle all form submissions throughout app
  // *atm does not support bottom drawer forms and auth forms*
  // TODO: refactor to support bottom drawer forms and auth forms
  const handleSubmit = async (form) => {
    const { actions, db, drawers, globalState } = hooks;
    const { active } = drawers;
    const selected = globalState?.exercise?.selected;

    // Handle profile form -- No selected item
    if ((active === "profile") || !selected) {
      form.bmr = calculators.bmr(form);
      form.tdee = calculators.tdee(form);
      // form.height = formatHeightToNumber(form.height);
    };

    // Handle selected item for food and exercise forms
    if (selected) form.name = (selected?.name || form.name);

    console.log("Making db submission inside: ", form, selected)

    if (active === "weight") {
      console.log("handleSubmit() active === weight: ", selected, form)
    }

    // Handle selected item for food form
    if (active === "food") {
      const nutrients = Object.assign(
        {},
        ...Object
          .keys(selected)
          .filter(key => key.includes("nf_"))
          .map(key => ({ [key.split("nf_")[1]]: selected[key] }))
      )
      // Format food submit *TODO: move to separate function
      const calculate_calories = (calories) => {
        const servingSize = parseInt(form.serving_size);
        const numServings = parseInt(form.num_servings);
        const serving = (typeof(servingSize) === "number")
          ? servingSize
          : 0;

          // PEMDAS -- order of operations 🤓
        return ((calories * serving) * numServings);
      };
      

      form = {
        ...form,
        calories: calculate_calories(nutrients?.calories),
        nutrients,
        date: form.date || new Date().toLocaleDateString(),
        time: form.time || new Date().toLocaleTimeString(),
        meal: form.meal || "snack",
      };
      // --- END Format food submit *TODO: move to separate function ---
    };

    // Handle selected item for exercise form
    if (selected?.muscle) {
      // Format exercise submit *TODO: move to separate function
      const formattedExercise = {
        date: form.date || new Date().toLocaleDateString(),
        time: form.time || new Date().toLocaleTimeString(),
        ...selected,
        ...form,
      };

      // // Get calories burned -- not working very well
      // API call to get calories burned -- API not working very well
      // const { name, weight, duration } = formattedExercise;
      // formattedExercise.caloriesBurned = await getCaloriesBurned({
      //   weight,
      //   duration: duration || 1,
      //   exercise: name
      // });

      form = formattedExercise;
      // --- END Format exercise submit *TODO: move to separate function ---
    };

    console.log("Making db submission: ", form)
    // Make request to database to save form data
    const [response, error] = await tryCatchHandler(
      // try
      () => {
        if (active === "profile" && hooks.profile) 
          db.update(active, hooks.profile.current_profile.id, form);
        else db.add(active, form);
      }, 
      // finally
      () => {
        // Refecth data -- pretty sure there is an option to refetch on mutation
        // TODO: look into refetch on mutation and refactor to remove this
        ({
          food: () => hooks.food.refetch(),
          exercise: () => hooks.exercise.refetch(),
          weight: () => hooks.weight.refetch(),
          profile: () => hooks.profile.refetch(),
        }[active])();

        // Clear selected item
        hooks.actions.handleSelected(null);

        // Handle Drawers accordingly
        if (active !== "profile" || !selected) actions.closeDrawers();
        else actions.updateDrawers({ 
          ...drawers, 
          anchor: "bottom"
        });
        
      })

    // Handle errors
    if (error || response.error) actions.createAlert("error", response.error?.message)
    // Trigger alerts
    if (!error) actions.createAlert("success", `Successfully added ${cap_first(active)} ${form?.name}`);
  };

  
  // Return submit handler
  return { handleSubmit };
};

const FieldWrapper = ({ field, children }) => {
  const { 
    values: { num_servings, serving_size },
    touched,
    setFieldValue,
  }  = useFormikContext();
  const [fieldProps, meta] = useField(field?.props);
  // console.log("FieldWrapper: ", num_servings, serving_size, touched.num_servings, touched.serving_size, field.props.name)

  // useEffect(() => {
  //   console.log("FieldWrapper useEffect: ", field)
  //   if (num_servings && serving_size) {
  //     console.log("Recalculate calories: ", num_servings, serving_size)
  //   }
  // }, [num_servings, serving_size, touched.num_servings, touched.serving_size, field.props.name, setFieldValue])

  return children;
}

const Fields = ({ schema, form }) => {
  return generateFields(schema, form)
    .map(field => {
      return field && (
        <Grid item xs={12} key={field.props.key}>
        {/* <FieldWrapper field={field}>
        </FieldWrapper> */}
              <InputLabel htmlFor={field.props.id}>
                {field.props.label}
              </InputLabel>
              {field}
            </Grid>
    )});
};


export const FormContainer = ({ 
  schema, 
  children,
  formFooterElements 
}) => {
  // Hooks / State
  const { handleSubmit } = useSubmit()
  const hooks = useHooks()

  const mapFoodFieldNamesToSelectedKeys = (name) => ({
    "name": "food_name",
    "calories": "nf_calories",
  })[name] || name;

  const getInitialValuesFromSelectedItem = (field) => {
    // Handle selected item for food and exercise forms
    const selected = hooks?.globalState?.exercise?.selected;
    // console.log("getInitialValuesFromSelectedItem: ", selected, field)
    const fieldMapping = mapFoodFieldNamesToSelectedKeys(field.column_name);
    if (selected[fieldMapping]) return selected[fieldMapping];
    else return field.column_default || "";
  };

  const initialValues = Object.assign(
    {}, 
    ...schema.map(field => !['id', 'created_at']
      .includes(field) && ({ 
        [field.column_name]: getInitialValuesFromSelectedItem(field)
      }))
      .filter(Boolean)
  );

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  // Set current selection on form object to extract default values
  formik.selected = hooks?.globalState?.exercise?.selected;
  
  // Extract Selected Item Name to display in form header
  let selectedItemName;
  if (formik?.selected) {
    // When selected is an exercise
    if (formik?.selected?.name) {
      selectedItemName = formik?.selected?.name;
      // // Get muscle group image
    }
    // When selected is a meal
    if (formik?.selected?.food_name) 
      selectedItemName = formik?.selected?.food_name
        || "Name not found";
  };

  formik.selectedItemName = selectedItemName;

  const closeRightDrawer = () => {
    hooks.actions.handleSelected(null);
    hooks.actions.closeDrawers();
    if (hooks.drawers.active === "profile") hooks.actions.closeDrawers();
    else hooks.actions.updateDrawers({ ...hooks.drawers, anchor: "bottom" });
  };

  const handleFormChange = (e) => {
    formik.handleChange(e);
    // recalculate calories based on new values
    if (["num_servings", "serving_size"].includes(e.target.name)) {
      // console.log("recalculate calories servings changed: ", e.target.value, e.target.id, formik.values)
      const values = formik.values;
      
      // if (!values.num_servings) formik.setFieldValue("num_servings", 0)
      // else formik.setFieldValue("num_servings", parseInt(values.num_servings))
      // if (!values.serving_size) formik.setFieldValue("serving_size", 0)
      // else formik.setFieldValue("serving_size", parseInt(values.serving_size))
      
      const num_servings = parseInt(values?.num_servings);
      const serving_size = parseInt(values?.serving_size);
      const calories = parseInt(formik?.selected?.nf_calories);
      const totalCalories = ((calories * serving_size) * num_servings)
      // console.log("recalculate calories servings changed: total:: ::", totalCalories)
      formik.setFieldValue("calories", typeof totalCalories === 'number' ? totalCalories : calories)
    };
  };

  formik.handleFormChange = handleFormChange;

  return (
    <Formik {...formik}>
      <Box 
        component="form" 
        onSubmit={formik.handleSubmit} 
        sx={{ width: '100%', height: '100%', overflow: 'auto' }}
      >
        {/* Universal Drawer Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", my: 2, py: 2 }}>
          <IconButton sx={{ color: "#fff"}} onClick={closeRightDrawer}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="p" gutterBottom>
            {`Add ${cap_first(hooks.drawers.active)}`}
          </Typography>
          <IconButton sx={{ color: "#fff"}} type="submit">
            <CheckIcon />
          </IconButton>
        </Box>

        {/* Dynamic Form Section */}
        <Grid container spacing={2} p={4}>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
            <Avatar src={formik?.selected?.photo?.thumb} />
            <ListItemText primary={selectedItemName} secondary={selectedItemName} />
          </Box>
          <Fields schema={schema} form={formik} />
        </Grid>
        {children}
        {formFooterElements}
      </Box>
    </Formik>
  );
}