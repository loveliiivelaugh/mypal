import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

import { DrawerHeader } from '../../hooks/useForms';
import { DateToggler } from '../forms';
import { useHooks } from '../../hooks';

import { legendOptions } from '../../utilities/constants';


const SleepDrawer = () => {
    const { food } = useHooks();
    return (
        <Box sx={{ width: "100%", height: "100vh", justifyContent: "center" }}>
          <DrawerHeader />
          <DateToggler />
          {/* {console.log("sleep:", sleep.data)} */}
          <Box sx={{ width: "100%", height: 600, justifyContent: "space-around", p: 4, mb: 4 }}>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: food.todaysFood.totalFat, label: 'Awake' },
                    { id: 1, value: food.todaysFood.totalProtein, label: 'REM' },
                    { id: 2, value: food.todaysFood.totalCarbs, label: 'Core' },
                    { id: 3, value: food.todaysFood.totalCarbs, label: 'Deep' },
                  ],
                  innerRadius: 90,
                  outerRadius: 120,
                },
              ]}
              // height={340}
              // width={500}
              slotProps={{
                legend: legendOptions
              }}
            />
          </Box>
          <Box sx={{ position: "sticky", bottom: 0, mt: 2 }}>
            <Typography variant="body1" component="p" px={2}>
              Sleep Data provided by bio peripherals via Apple Shortcuts.
            </Typography>
            <Typography variant="body1" component="p" gutterBottom px={2}>
              Learn more about it on our blog. Or visit our website.
            </Typography>
          </Box>
        </Box>
    )
}

export default SleepDrawer;