import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerts, exercise } from '../redux';
import { supabase } from '../db';

// Services
import { 
  useGetSessionQuery,
  useGetAllQuery,
  dbApi,
  useAddMutation,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useResetPasswordMutation,
  useLoginWithOtpMutation,
  useGetCaloriesBurnedQuery,
  useGetMuscleGroupImageQuery,
  useSendChatMutation,
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
    handleSelected: (payload) => dispatch(exercise.handleSelected(payload)),
    setLandingPage: (payload) => dispatch(alerts.setLandingPage(payload)),
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
      listener?.unsubscribe();
    };
  }, []);

  return session;
}


export const useHooks = () => {
  // Hooks / Initial Queries / Redux
  const responsive = useResponsive();
  const actions = useActions();
  const globalState = useSelector(state => state);
  const auth = useGetSessionQuery();
  // console.log(globalState);
  const queryOptions = {
    refetchOnMountOrArgChange: true,
  };
  const food = useGetAllQuery("food", queryOptions);
  const weight = useGetAllQuery("weight", queryOptions);
  const exercise = useGetAllQuery("exercise", queryOptions);
  const steps = useGetAllQuery("steps", queryOptions);
  const profile = useGetAllQuery("profile", queryOptions);
  const sleep = useGetAllQuery("sleep", queryOptions);

  // Mutations
  // Open Source LLM -- Llama2, Mistral, CodeLlama, Dolphin Phi
  const [sendChat, chatResult] = useSendChatMutation();
  // Supabase -- DB
  const [addToDb, addToDbResult] = useAddMutation();
  // Supabase -- Auth
  const [login, loginResult] = useLoginMutation();
  const [logout, logoutResult] = useLogoutMutation();
  const [signup, signupResult] = useSignupMutation();
  const [resetPassword, resetPasswordResult] = useResetPasswordMutation();
  const [loginWithOtp, loginWithOtpResult] = useLoginWithOtpMutation();

  // TODO: Move as much of this logic as possible to the backend (SQL queries) or ...
  // ... to the Redux store (slices) and their respective queries

  
  // Destructuring and formatting for ease of use throughout the app
  let user_id = auth?.data?.session?.user?.id;
  let user_email = auth?.data?.session?.user?.email;
  // Update this line to use a SQL query instead with the related tables ...
  // ... data: (user_id: exercises, foods, weight, profile)
  let current_profile = profile?.data?.find((item) => item.user_id === user_id);
  
  // Need to update this to separate drawers into its own slice
  let drawers = globalState?.alerts?.drawers;
  let todaysCaloriesConsumed = food?.data
    ?.filter((item) => (
      (item.user_id === user_id) && (item.date === new Date().toISOString().slice(0, 10))
    ));

  let todaysCaloriesBurned = exercise?.data
    ?.filter((item) => (
      (item.user_id === user_id) && (item.date === new Date().toISOString().slice(0, 10))
    ));

  steps.todaysSteps = steps?.data 
    ? steps?.data.reduce((total, steps) => total + steps.value, 0)
    : 0;

  const calculateTotalCalories = (foodArray = []) => {
    // Use the reduce function to sum up the 'calories' property of each object
    const totalCalories = foodArray.reduce((total, food) => total + food.calories, 0);
    return totalCalories;
  };

  // Calculate the total calories consumed for the day
  const calculateTotalCaloriesBurned = (exerciseArray = []) => {
    // Use the reduce function to sum up the 'calories' property of each object
    const totalCaloriesBurned = exerciseArray.reduce((total, exercise) => total + exercise.calories_burned, 0);
    return totalCaloriesBurned;
  };

  food.todaysFood = {
    totalCarbs: food?.data?.reduce((total, food) => total + food.nutrients?.total_carbohydrate, 0),
    totalFat: food?.data?.reduce((total, food) => total + food.nutrients?.total_fat, 0),
    totalProtein: food?.data?.reduce((total, food) => total + food.nutrients?.protein, 0),
    nutrientTotals: Object
      .keys(food?.data?.[0]?.nutrients || {})
      .map((key) => ({
        name: key,
        value: food?.data?.reduce((total, food) => total + food.nutrients[key], 0),
      })),
  };
  food.todaysCaloriesConsumed = calculateTotalCalories(todaysCaloriesConsumed);
  exercise.todaysCaloriesBurned = calculateTotalCaloriesBurned(todaysCaloriesBurned);
  
  // Remaining calories for the day = Goal (TDEE) - calories consumed + calories burned (exercise)
  food.goalCalories = ((current_profile?.tdee - food.todaysCaloriesConsumed)
    + exercise.todaysCaloriesBurned
  ).toFixed(0);

  // Authentication Methods
  const methods = { login, logout, signup, resetPassword, loginWithOtp };
  const ai = { sendChat, chatResult };
  auth.methods = methods;
  auth.email = user_email;

  // console.log("useHooks", sleep)

  return {
    user_id,
    auth, 
    globalState,
    responsive,
    profile: { ...profile, current_profile }, 
    weight, 
    exercise,
    steps,
    food,
    sleep,
    actions,
    db: dbApi,
    drawers,
    ai,
  };
}