import { cap_first } from "../utilities/helpers";

export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day  = date.getDate();
  return `${year}-${month}-${day}`;
}

export const profile_schema = [
  {
    "column_name": "id",
    "data_type": "bigint",
    "column_default": ""
  },
  {
    "column_name": "created_at",
    "data_type": "time",
    "column_default": getCurrentDate()
  },
  {
    "column_name": "age",
    "data_type": "integer",
    "column_default": 21
  },
  {
    "column_name": "height",
    "data_type": "integer",
    "column_default": 70
  },
  {
    "column_name": "weight",
    "data_type": "integer",
    "column_default": 150
  },
  {
    "column_name": "goal",
    "data_type": "select",
    "column_default": 0,
    "options": [
      {
        "label": "Lose Weight",
        "value": -500
      },
      {
        "label": "Maintain Weight",
        "value": 0
      },
      {
        "label": "Gain Weight",
        "value": 500
      }
    ]
  },
  {
    "column_name": "exercise",
    "data_type": "select",
    "column_default": 1.55,
    "options": [
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
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": "auth.uid()"
  },
  {
    "column_name": "tdee",
    "data_type": "integer",
    "column_default": 2000
  },
  {
    "column_name": "bmr",
    "data_type": "integer",
    "column_default": 2000
  }
]

export const  weight_schema = [
  {
    "column_name": "id",
    "data_type": "bigint",
    "column_default": ""
  },
  {
    "column_name": "created_at",
    "data_type": "time",
    "column_default": getCurrentDate()
  },
  {
    "column_name": "date",
    "data_type": "date",
    "column_default": getCurrentDate()
  },
  {
    "column_name": "weight",
    "data_type": "text",
    "column_default": ""
  }
];

export const  food_schema = [
  {
    "column_name": "calories",
    "data_type": "integer",
    "column_default": ""
  },
  {
    "column_name": "created_at",
    "data_type": "time",
    "column_default": getCurrentDate()
  },
  {
    "column_name": "nutrients",
    "data_type": "jsonb",
    "column_default": ""
  },
  {
    "column_name": "id",
    "data_type": "bigint",
    "column_default": ""
  },
  {
    "column_name": "date",
    "data_type": "date",
    "column_default": ""
  },
  {
    "column_name": "time",
    "data_type": "time",
    "column_default": ""
  },
  {
    "column_name": "name",
    "data_type": "text",
    "column_default": ""
  }
];

export const  exercise_schema = [
  {
    "column_name": "id",
    "data_type": "bigint",
    "column_default": ""
  },
  {
    "column_name": "created_at",
    "data_type": "date",
    "column_default": getCurrentDate()
  },
  {
    "column_name": "reps",
    "data_type": "integer",
    "column_default": ""
  },
  {
    "column_name": "sets",
    "data_type": "integer",
    "column_default": ""
  },
  {
    "column_name": "date",
    "data_type": "date",
    "column_default": ""
  },
  {
    "column_name": "name",
    "data_type": "text",
    "column_default": ""
  }
];

export const buildFields = (schema) => {
  const formatDataTypes = (type) => ({
    "integer": "number",
    "bigint": "number",
    "text": "text",
    "date": "date",
    "time": "time",
    "jsonb": "json",
    "select": "select"
  }[type]) || "text";

  return schema.map((field) => {
    return (field.column_name !== "id") && {
      label: cap_first(field.column_name),
      type: formatDataTypes(field.data_type),
      name: field.column_name,
      defaultValue: field.column_default,
      helperText: `Enter your ${field.column_name}`,
      ...(field.options ? { options: field.options } : {})
    }
  }).filter(field => field) // filter out undefined values
}