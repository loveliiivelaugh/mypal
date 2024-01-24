import { useEffect, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Alert, Typography } from '@mui/material'

import { alerts as actions } from '../../redux'


const Alerts = (props) => {
    const dispatch = useDispatch()
    const alerts = useSelector(state => state.alerts)
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

export default Alerts
  