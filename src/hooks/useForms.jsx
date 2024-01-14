import { useState } from 'react'
import { useFormik } from 'formik';
import { 
  Box, Grid, IconButton, InputLabel, Typography
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { useHooks } from '.'
import { cap_first, generateFields, tryCatchHandler } from '../utilities/helpers'
import { validationSchema } from '../utilities/validations';


export const useForms = () => {
  const hooks = useHooks()
  const [state, setState] = useState({})

  console.log("useForms: ", state)

  // Handlers
  // handleSubmit handles all form submissions throughout app
  const handleSubmit = async (form) => {
    const { actions, db, drawers, globalState } = hooks;
    const { active } = drawers;
    const { name, nutrients, muscle } = globalState?.exercise?.selected;
    form.name = name || form.name;
    console.log("handleSubmit: ", form, active, globalState);
    if (nutrients) {
      // Format food submit *TODO: move to separate function
      const calculate_calories = (calories) => {
        const servingSize = parseInt(form.serving_size);
        const numServings = parseInt(form.num_servings);
        const serving = (typeof(servingSize) === "number")
          ? servingSize
          : 1;

        return ((calories * serving) * numServings);
      };
      
      const formattedNutrients = Object.assign(
        {}, 
        ...Object
          .keys(nutrients)
          .map(nutrient => ({ 
            [nutrient]: nutrients[nutrient]?.per_hundred, 
            unit: nutrients[nutrient]?.unit 
        })))

      if (active === "food") form = {
        name: state.selected?.name_translations["en" || "it"] 
          || "No name/english translation found", 
        calories: calculate_calories(
          nutrients?.energy_calories_kcal?.per_hundred
          || nutrients?.energy_calories_kcal?.per_portion
        ),
        nutrients: formattedNutrients,
        date: form.date || new Date().toLocaleDateString(),
        time: form.time || new Date().toLocaleTimeString(),
        meal: form.meal || "snack",
      };
      // --- END Format food submit *TODO: move to separate function ---
    };

    if (muscle) {
      console.log("if muscle", state, form);
      
      // Format exercise submit *TODO: move to separate function
      const formattedExercise = {
        date: form.date || new Date().toLocaleDateString(),
        time: form.time || new Date().toLocaleTimeString(),
        ...state.selected,
        ...form,
      };

      // // Get calories burned
      // API call to get calories burned -- not working very well
      // const { name, weight, duration } = formattedExercise;
      // formattedExercise.caloriesBurned = await getCaloriesBurned({
      //   weight,
      //   duration: duration || 1,
      //   exercise: name
      // });

      console.log("caloriesBurned", formattedExercise);

      form = formattedExercise;
      // --- END Format exercise submit *TODO: move to separate function ---
    }

    const [response, error] = await tryCatchHandler(
      () => db.add(active, form), 
      () => {
        actions.closeDrawers();
        actions.createAlert("success", `Successfully added ${cap_first(active)} ${form?.name}`);
        actions.updateDrawers({ ...drawers, anchor: "bottom" });
      })

    if (error || response.error) actions.createAlert("error", response.error?.message);

    // refecth data
    ({
      food: () => hooks.food.refetch(),
      exercise: () => hooks.exercise.refetch(),
      weight: () => hooks.weight.refetch(),
      profile: () => hooks.profile.refetch(),
    }[active])();
  };

  
  // Return all functions and state to be used in components
  return { 
    formState: state,
    setFormState: setState,
    handleSubmit,
  };
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
  const forms = useForms()
  const hooks = useHooks()
  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    onSubmit: forms.handleSubmit,
  });

  // Set selected on form object to extract default values
  formik.selected = hooks?.globalState?.exercise?.selected;

  return (
    <Box 
      component="form" 
      onSubmit={formik.handleSubmit} 
      sx={{ width: '100%', height: '100%', overflow: 'auto' }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2, py: 2 }}>
        <IconButton sx={{ color: "#fff"}} onClick={hooks.actions.closeDrawers}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="p" gutterBottom>
          {`Add ${cap_first(hooks.drawers.active)}`}
        </Typography>
        <IconButton sx={{ color: "#fff"}} type="submit">
          <CheckIcon />
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        <Fields schema={schema} form={formik} />
      </Grid>
      {children}
      {formFooterElements}
    </Box>
  );
}