import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';


const Line = (props) => {

    return (
        <div>
            <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                  },
                ]}
                width={500}
                height={300}
            />
        </div>
    )
}

const Bar = () => {

    return (
        <div>
            {/* <BarChart /> */}
        </div>
    )
}

const Pie = () => {

    return (
        <div>
            {/* <PieChart /> */}
        </div>
    )
}

const Table = () => {

    return (
        <div>
            {/* <Table /> */}
        </div>
    )
}



export const Charts = (props) => {
    const {
        // default props
        type = 'line',
        height = 400,
        width = '100%',
    } = props;

    // Add extra logic 
    return ({
        line: <Line />,
        bar: <Bar />,
        pie: <Pie />,
        table: <Table />,
    }[type])
}

