import { useState } from 'react'
import { IconButton, Toolbar } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';


export const DateToggler = () => {
    const [value, setValue] = useState(dayjs(new Date()));
    const handleNextPrevDay = (direction) => {
        if (direction === "next") setValue(dayjs(value).add(1, 'day'));
        if (direction === "prev") setValue(dayjs(value).subtract(1, 'day'));
    }
    return (
        <Toolbar sx={{ display: "flex", justifyContent: "space-betweeen", width: '100%' }}>
            <IconButton onClick={() => handleNextPrevDay("prev")}>
                <NavigateBeforeIcon />
            </IconButton>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateField']}>
                <DateField
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                />
                </DemoContainer>
            </LocalizationProvider>
            <IconButton onClick={() => handleNextPrevDay("next")}>
                <NavigateNextIcon />
            </IconButton>
        </Toolbar>
    )
}