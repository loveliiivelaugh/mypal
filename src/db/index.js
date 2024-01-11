// Database connection

// Packages
import { createClient } from '@supabase/supabase-js'

// Constants
const { 
  REACT_APP_SUPABASE_URL: url, 
  REACT_APP_SUPABASE_KEY: key
} = process.env;
const options = {
  db: {
    schema: 'public'
  }
};
const supabase = createClient(url, key, options);

export { supabase };
