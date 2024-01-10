import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { alerts } from '../redux';

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
    createAlert: (type, message) => dispatch(alerts.createAlert({ type, message }))
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