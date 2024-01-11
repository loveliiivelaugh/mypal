import React from 'react'
import PropTypes from 'prop-types'
import { 
  Button, Grid, InputLabel, MenuItem, Select, TextField, Toolbar, Typography 
} from '@mui/material'

import { tryCatchHandler } from '../../utilities/helpers'
import { dbApi } from '../../api'
import { useHooks } from '../../hooks'

// Array of fields to render
let fields = [
  {
    label: "Age",
    type: "number",
    name: "age",
    defaultValue: 21,
    helperText: "Enter your age"
  },
  {
    label: "Height",
    type: "text",
    name: "height",
    defaultValue: "5'10",
    helperText: "Enter your height"
  },
  {
    label: "Weight",
    type: "number",
    name: "weight",
    defaultValue: 150,
    helperText: "Enter your weight"
  },
  {
    label: "Exercise",
    type: "select",
    name: "exercise",
    defaultValue: 1.55, 
    helperText: "Enter your exercise",
    options: [
      {
        label: "Sedentary",
        value: 1.2
      },
      {
        label: "Lightly Active",
        value: 1.375
      },
      {
        label: "Moderately Active",
        value: 1.55
      },
      {
        label: "Very Active",
        value: 1.725
      },
      {
        label: "Extremely Active",
        value: 1.9
      }
    ]
  },
  {
    label: "Goal",
    type: "select",
    name: "goal",
    defaultValue: 0,
    helperText: "Enter your goal",
    options: [
      {
        label: "Lose Weight",
        value: -500
      },
      {
        label: "Maintain Weight",
        value: 0
      },
      {
        label: "Gain Weight",
        value: 500
      },
    ]
  },
]

const TdeeCalculator = props => {
  const hooks = useHooks();
  const [formState, setFormState] = React.useState(
    Object.assign(
      {}, 
      ...fields.map(field => ({ [field.name]: field.defaultValue }))
    )
  );

  // import default values from the database if there are any.
  fields = fields.map(field => {
    if (hooks.profile[field.name])
      field.defaultValue = hooks.profile[field.name];
    return field;
  });

  console.log("fields", fields)

  const handleChange = (event) => setFormState({ 
    ...formState, 
    [event.target.name]: event.target.value 
  });

  // TODO: This needs to be added to the dynamic submit handler
  const handleSubmit = async () => {
    formState.user_id = hooks.user_id;
    console.log("submit", formState)
    const [response, error] = await tryCatchHandler(
      () => dbApi.add("profile", [formState]))

    if (response.error) {
      const { code, message, details } = response.error;
      hooks.actions.createAlert("error", `Error Code: ${code}\n${message}\n ${details}`)
    }
    console.log("response", response, error)
  };

  return (
    <Grid container p={4}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Total Daily Energy Expenditure Calculator
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" component="body1" gutterBottom>
          This calculator will estimate your daily calorie requirements for losing, maintaining and gaining weight. We use this information to determine the calories required to maintain your current weight. Then we subtract 500 calories per day to create a calorie deficit and help you lose weight. We also add 500 calories per day to create a calorie surplus and help you gain weight. If you want to lose or gain weight, enter your goal weight. We also use your calorie intake to determine your macronutrient ratio (carbohydrate, protein, fat). You can learn more about this calculator and how it works in our blog.
        </Typography>
      </Grid>
      <Toolbar />
      {fields.map((field, index) => (
        <Grid item xs={12} key={index} sx={{ display: "flex", justifyContent: "space-between", my: 0.25 }}>
          <InputLabel>{field.label}</InputLabel>
          {field.type === "select" ? (
            <Select
              id={field.name}
              aria-describedby="my-helper-text"
              type={field.type}
              name={field.name}
              defaultValue={field.defaultValue}
              helperText={field.helperText}
              select={field.type === "select"}
              onChange={handleChange}
              required
              SelectProps={{
                native: true,
              }}
            >
              {field.options && field.options.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          ) : (
          <TextField
            id={field.name}
            aria-describedby="my-helper-text"
            type={field.type}
            name={field.name}
            defaultValue={field.defaultValue}
            onChange={handleChange}
            helperText={field.helperText}
            required
          />
          )}
        </Grid>
      ))}
      <Grid item xs={12} my={1}>
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}

TdeeCalculator.propTypes = {}

export default TdeeCalculator