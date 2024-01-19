// Packages / Imports
import { Box, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import AttachmentIcon from '@mui/icons-material/Attachment';
import { BasicDatePicker } from '../components/forms';
import { BasicTimePicker } from '../components/forms/BasicDatePicker';




export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day  = date.getDate();
  return `${year}-${month}-${day}`;
};

export const getCurrentTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
};

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
    const bmr = (88.362 + (13.397 * parseInt(weight)) + (4.799 * height) - (5.677 * parseInt(age)));
    return parseInt(bmr);
  },
  tdee: (params) => {
    console.log("calculators.tdee(): ", params)
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

const mapFoodFieldNamesToSelectedKeys = (name) => ({
  "name": "food_name",
  "calories": "nf_calories",
})[name] || name;

const generateFields = (schema, form) => {
  // console.log("generateFields(): ", schema, form)

  let defaultValue;
  // Build array of field objects from schema
  const fieldsObjectFromSchema = schema
    .map((field) => {
      
      if ((field.column_name !== "id") && !field.hidden) {

        defaultValue = (form.selected[
          Object.keys(form.initialValues).includes("calories") 
            ? mapFoodFieldNamesToSelectedKeys(field.column_name)
            : field.column_default
        ] || field.column_default);
        // defaultValue = form.selected[field.column_name] || field.column_default;

        if (field.column_name === "date") defaultValue = getCurrentDate();
        if (field.column_name === "time") defaultValue = getCurrentTime();

        // form.values[field.column_name] = defaultValue;

        return ({
          label: cap_first(field.column_name).replace("_", " "),
          type: formatDataTypes(field.data_type),
          name: field.column_name,
          defaultValue,
          helperText: `Enter your ${field.column_name}`,
          required: false,
          onChange: form.handleChange,
          hidden: field.hidden || false,
          ...(field.options && { options: field.options })
        })
      } // end if statement

    }).filter(field => field); // filter out undefined values

  // Build field elements from fields object
  return buildFieldElementsFromFieldsObject(fieldsObjectFromSchema, form);
};

const buildFieldElementsFromFieldsObject = (fieldsObject, formState) => fieldsObject
  .map((field) => {

    // Destructure field object
    const {
      name, 
      type, 
      label, 
      helperText, 
      defaultValue, 
      hidden, 
      // if options doesnt have a value set it to an empty array
      options = [] 
    } = field;

    const formatDateAndTimeValues = (name) => ({
      "date": new Date(formState[name]),
      "time": new Date(formState[name]),
    }[name] || formState[name])

    // console.log("formatDateAndTime: ", formatDateAndTimeValues(name))
    // Define common properties for all fields
    const commonProperties = {
      key: name,
      id: name,
      value: formState[name],
      name,
      type,
      label,
      helperText,
      defaultValue,
      // onChange: formState.handleChange,
      onChange: formState.handleFormChange,
      sx: { hidden }
    };

    // Define properties specific to the field type
    const FieldsProps = {
      TextField: {...commonProperties },
      Select: {
        ...commonProperties,
        options,
        SelectProps: {
          native: true,
        },
      },
      Date: {
        ...commonProperties,
        // value: new Date(field.value).toLocaleDateString(),
        // placeholder: new Date().toLocaleDateString(),
      },
      Time: {
        ...commonProperties,
        // value: new Date(field.value).toLocaleTimeString(),
        // placeholder: new Date().toLocaleTimeString(),
      },
      Json: {
        ...commonProperties,
        value: JSON.stringify(field.value),
        type: "text",
        multiline: true,
        minRows: 4,
      },
    };

    return ({
      text: <TextField {...FieldsProps.TextField} />,
      number: <TextField {...FieldsProps.TextField} />,
      date: <BasicDatePicker {...FieldsProps.Date} />,
      time: <BasicTimePicker {...FieldsProps.Time} />,
      select: <SelectWrapper {...FieldsProps.Select} />,
      json: <TextField {...FieldsProps.Json} />,
      attachment: <Attachment />,
    }[type])
  });

const Attachment = () => (
  <Box sx={{}}>
    <Typography id="demo-simple-select-label" variant="body1">
      Progress Photo
    </Typography>
    <IconButton p={1}>
      <AttachmentIcon />
      <attachment />
    </IconButton>
  </Box>
);

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