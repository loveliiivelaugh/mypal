import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function BasicDatePicker(props) {
  return (
    <DatePicker id="date" label={props.label} value={props.value} onChange={props.handleChange} />
  );
}

export const BasicTimePicker = (props) => {
  return (
    <TimePicker id="time" label={props.label} value={props.value} onChange={props.handleChange}/>
  );
}