import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function BasicDatePicker(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker id="date" label={props.label} value={props.value} onChange={props.handleChange} />
    </LocalizationProvider>
  );
}

export const BasicTimePicker = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker id="time" label={props.label} value={props.value} onChange={props.handleChange}/>
    </LocalizationProvider>
  );
}