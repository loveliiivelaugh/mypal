// Packages
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Providers
import { ThemeProvider } from './theme';
import { store } from './redux';

// Components
import App from './App';
import ErrorBoundary from './components/pages/ErrorBoundary';
import { Alerts } from './components/layout';

// Utitlities
import reportWebVitals from './utilities/reportWebVitals';

// Global Styles
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <App />
            <Alerts />
          </LocalizationProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
