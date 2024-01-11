
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
  console.log("formatHeightToNumber args: ", height)
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
}


export { cap_first, tryCatchHandler, calculators, formatHeightToNumber }