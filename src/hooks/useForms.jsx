// Packages
import { 
  Box, Grid, IconButton, InputLabel, ListItemText, Typography
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';

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

    // Handle selected item for food form
    if (selected?.nutrients) {
      const { nutrients } = selected;
      // Format food submit *TODO: move to separate function
      const calculate_calories = (calories) => {
        const servingSize = parseInt(form.serving_size);
        const numServings = parseInt(form.num_servings);
        const serving = (typeof(servingSize) === "number")
          ? servingSize
          : 1;

          // PEMDAS -- order of operations 🤓
        return ((calories * serving) * numServings);
      };
      
      const formattedNutrients = Object.assign(
        {}, 
        ...Object
          .keys(nutrients)
          .map(nutrient => ({
            [nutrient]: (nutrients[nutrient]?.per_hundred 
              || nutrients[nutrient]?.per_portion), 
            unit: nutrients[nutrient]?.unit 
        })))

      form = {
        calories: calculate_calories(nutrients?.energy_calories_kcal),
        nutrients: formattedNutrients,
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

const Fields = ({ schema, form }) => {
  return generateFields(schema, form)
    .map(field => (
      <Grid item xs={12} key={field.props.key}>
        <InputLabel htmlFor={field.props.id}>
          {field.props.label}
        </InputLabel>
        {field}
      </Grid>
    ));
};


export const FormContainer = ({ schema, children, formFooterElements }) => {
  // Hooks / State
  const { handleSubmit } = useSubmit()
  const hooks = useHooks()
  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  console.log("Right drawer opened: Last attempt muscle group image: ", hooks)
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
    if (formik?.selected?.display_name_translations) 
      selectedItemName = formik?.selected?.display_name_translations["en" || "it"]
        || "Name not found";
  };

  formik.selectedItemName = selectedItemName;

  const closeRightDrawer = () => {
    hooks.actions.handleSelected(null);
    hooks.actions.closeDrawers();
    if (hooks.drawers.active === "profile") hooks.actions.closeDrawers();
    else hooks.actions.updateDrawers({ ...hooks.drawers, anchor: "bottom" });
  };

  return (
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
        <ListItemText primary={selectedItemName} secondary={selectedItemName} />
        <Fields schema={schema} form={formik} />
      </Grid>
      {children}
      {formFooterElements}
    </Box>
  );
}