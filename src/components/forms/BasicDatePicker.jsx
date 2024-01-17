import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker id="date" label={props.label} value={props.value} onChange={props.handleChange} />
    </LocalizationProvider>
  );
}