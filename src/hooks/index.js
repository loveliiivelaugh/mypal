import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerts } from '../redux';
import { supabase } from '../db';

// Services
import { 
  useGetSessionQuery,
  useGetAllQuery,
  useGetQuery,
  useGetExerciseQuery, 
  useGetFoodQuery, 
  dbApi,
  useAddMutation, 
} from '../api';

// useResponsive hook -- used to determine the screen size
import { useMediaQuery } from '@react-hook/media-query';

const breakpoints = {
  small: '(max-width: 767px)',
  medium: '(min-width: 768px) and (max-width: 1023px)',
  large: '(min-width: 1024px)',
};

// Usage
// const { isSmallScreen, isMediumScreen, isLargeScreen } = useResponsive();
export const useResponsive = () => {
  const isSmallScreen = useMediaQuery(breakpoints.small);
  const isMediumScreen = useMediaQuery(breakpoints.medium);
  const isLargeScreen = useMediaQuery(breakpoints.large);

  return {
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
  };
};


// useMealTime hook -- used to determine the meal time based on the time of day
export const useMealTime = () => {
  const [mealTime, setMealTime] = useState(null);

  useEffect(() => {
    const getCurrentMealTime = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 6 && currentHour < 12) {
        return 'breakfast';
      } else if (currentHour >= 12 && currentHour < 18) {
        return 'lunch';
      } else {
        return 'dinner';
      }
    };

    // Set the initial meal time
    setMealTime(getCurrentMealTime());

    // Update meal time every minute (you can adjust the interval based on your needs)
    const intervalId = setInterval(() => {
      setMealTime(getCurrentMealTime());
    }, 60000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return mealTime;
};


// useActions hook -- used to dispatch actions (simple wrapper around useDispatch to reduce verbosity and boilerplate)
export const useActions = () => {
  const dispatch = useDispatch();
  return {
    createAlert: (type, message) => dispatch(alerts.createAlert({ type, message })),
    updateDrawers: (payload) => dispatch(alerts.updateDrawers(payload)),
    closeDrawers: () => dispatch(alerts.closeDrawers()),
  }
};


// useColorMode hook -- used to toggle between light and dark mode
export const useColorMode = () => {
  const [colorMode, setColorMode] = useState('dark');

  const toggleColorMode = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  };

  return [colorMode, toggleColorMode];
}


// useAuth hook -- used to get the current user session
export const useAuth = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get the session from Supabase
    const session = supabase.auth.getSession();

    // Update the local session state if the session changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
      }
    );

    // Initial state
    setSession(session);

    // Cleanup
    return () => {
      // listener?.unsubscribe();
    };
  }, []);

  return session;
}


export const useHooks = () => {
  // Hooks / Initial Queries / Redux
  const responsive = useResponsive();
  const globalState = useSelector(state => state);
  const auth = useGetSessionQuery();
  const weight = useGetAllQuery("weight");
  const exercise = useGetAllQuery("exercise");
  const food = useGetAllQuery("food");
  const profile = useGetAllQuery("profile");
  const add = useAddMutation();
  const actions = useActions();
  
  let user_id = auth?.data?.session?.user?.id;
  let current_profile = profile?.data?.find((item) => item.user_id === user_id);
  let drawers = globalState?.alerts?.drawers;

  return { 
    user_id,
    auth, 
    globalState, 
    responsive,
    profile: current_profile, 
    weight, 
    exercise, 
    food, 
    actions,
    db: dbApi, add,
    drawers,
  };
}