// Packages / Imports
import { MenuItem, Select, TextField } from '@mui/material'
import BasicDatePicker from '../components/BasicDatePicker';


// Utilities
const cap_first = (str) => (typeof(str) ==="string") 
  ? str.charAt(0).toUpperCase() + str.slice(1)
  : "Error: Not a string. Argument must be a string."

const tryCatchHandler = async (promise, final) => {
  try { 
    const result = await promise();
    return [result, null]; 
  }
  catch (error) { 
    return [null, error]; 
  } 
  finally { 
    final && final(); 
  }
};

// Move to utilities/helpers.js
const formatHeightToNumber = (height) => {
  if (height.includes("'")) {
    const [feet, inches] = height.split("'");
    return (parseInt(feet) * 12) + parseInt(inches);
  }
}

const calculators = {
  bmr: ({ age, height, weight }) => {
    const bmr = (88.362 + (13.397 * parseInt(weight)) + (4.799 * formatHeightToNumber(height)) - (5.677 * parseInt(age)));
    return parseInt(bmr);
  },
  tdee: (params) => {
    const { exercise, goal } = params;
    const tdee = (calculators.bmr(params) * exercise + goal);
    return parseInt(tdee);
  },
  caloriesRemaining: ({ tdee, caloriesConsumed = 0, caloriesBurned = 0 }) => 
    parseInt(tdee - caloriesConsumed + caloriesBurned),
};

// Format data types from postgres to mui textfield types
const formatDataTypes = (type) => ({
  "integer": "number",
  "bigint": "number",
  "text": "text",
  "date": "date",
  "time": "time",
  "jsonb": "json",
  "select": "select"
}[type]) || "text";

const generateFields = (schema, form) => {

  // console.log("generateFields(): ", schema, form)
  // Build array of field objects from schema
  const fieldsObjectFromSchema = schema
    .map((field) => (field.column_name !== "id") && ({
      label: cap_first(field.column_name),
      type: formatDataTypes(field.data_type),
      name: field.column_name,
      defaultValue: field.column_default,
      helperText: `Enter your ${field.column_name}`,
      required: false,
      onChange: form.handleChange,
      ...(field.options && { options: field.options })
    })
  ).filter(field => field) // filter out undefined values

  // // Update form state according to data with default values
  // fieldsObjectFromSchema
  //   .forEach(({ name, defaultValue }) => handleChange({ 
  //     target: { id: name, value: defaultValue || "" } 
  //   }));
  // fieldsObjectFromSchema
  //   .forEach(({ name, defaultValue }) => formState[name] = defaultValue || "");

  const formState = Object.assign(
    {}, 
    ...fieldsObjectFromSchema.map(field => ({ 
      [field.name]: field.defaultValue || "" 
    }))
  );

  // form.setValues(formState);

  // Build field elements from fields object
  return buildFieldElementsFromFieldsObject(fieldsObjectFromSchema, form);
};

const buildFieldElementsFromFieldsObject = (fieldsObject, formState) => fieldsObject
  .map((field) => {
    const {
      name, type, label, helperText, defaultValue, options = [] 
    } = field;

    // console.log("buildFieldElementsFromFieldsObject(): ", field, formState)
    // Define common properties for all fields
    const FieldProps = {
      key: name,
      id: name,
      value: formState[name],
      name,
      type,
      label,
      helperText,
      defaultValue,
      // onChange: ((event) => {
      //   // if input type is text field
      //   if (event?.target) formState[name] = event.target.value;
      //   // if input type is date field
      //   if (event?.date) formState.date = new Date(event).toLocaleDateString();
      // }),
      onChange: formState.handleChange,
    };

    const TextFieldProps = {
      ...FieldProps,
      // variant: "outlined",
      // fullWidth: true,
      // margin: "normal",
    };

    const SelectProps = {
      ...FieldProps,
      // variant: "outlined",
      // fullWidth: true,
      // margin: "normal",
      options,
      SelectProps: {
        native: true,
      },
    };

    const DateProps = {
      ...FieldProps,
      value: '', // TODO: Fix this -- throwing error w/defaultValue
      placeholder: new Date().toLocaleDateString(),
    }

    return ({
      text: <TextField {...TextFieldProps} />,
      number: <TextField {...TextFieldProps} />,
      date: <BasicDatePicker {...DateProps} />,
      time: <BasicDatePicker {...DateProps} />,
      select: <SelectWrapper {...SelectProps} />,
    }[type])
  });

const SelectWrapper = (props) => (
  <Select {...props}>
    {props.options && props.options
      .map((option, index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
    ))}
  </Select>
);
  

export { 
  calculators,
  cap_first,
  tryCatchHandler, 
  formatHeightToNumber, 
  generateFields,
}