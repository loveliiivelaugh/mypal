
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

export { cap_first, tryCatchHandler }