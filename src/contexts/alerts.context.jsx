import { createContext, useEffect, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Snackbar, Alert, Typography } from '@mui/material'

import { alerts as actions } from '../redux'


const alertsContext = createContext();

export const AlertsProvider = ({ children }) => {
  return (
    <alertsContext.Provider value={{}}>
      {children}
      <Alerts/>
    </alertsContext.Provider>
  )
}

const Alerts = (props) => {
  const dispatch = useDispatch()
  const { alerts } = useSelector(state => state)
  const [open, setOpen] = useState(false)

  const origin = { vertical: 'bottom', horizontal: 'right' };

  useEffect(() => {

    if (alerts.message) {
      setOpen(true)

      setTimeout(() => {
        setOpen(false);
        dispatch(actions.removeAlert())
      }, 6000);
    }
  }, [alerts, dispatch])

  return (
    <Snackbar open={open} autoHideDuration={6000} anchorOrigin={origin}>
      <Alert severity={alerts.type || 'info'} onClose={() => {}} action={null}>
        {alerts?.message && 
          alerts?.message
            ?.split('\n')
            .map((message, i) => (
          <Typography key={i} variant="h6">
            {message}
          </Typography>
        ))}
      </Alert>
    </Snackbar>
  )
};

Alerts.propTypes = {
  action: PropTypes.bool,
  onClose: PropTypes.func,
  message: PropTypes.string,
  type: PropTypes.oneOf([
    'success',
    'info',
    'warning',
    'error'
  ])
}

