// Database connection
// TODO: Currently migrating DB from Supabase to SQLite3 in order to support on device storage
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
