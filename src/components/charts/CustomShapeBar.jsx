import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '12/10',
    steps: 4000,
    amt: 2400,
  },
  {
    name: '12/11',
    steps: 3000,
    amt: 2210,
  },
  {
    name: '12/12',
    steps: 2000,
    amt: 2290,
  },
  {
    name: '12/13',
    steps: 10000,
    amt: 10000,
  },
  {
    name: '12/14',
    steps: 1890,
    amt: 2181,
  },
  {
    name: '12/15',
    steps: 2390,
    amt: 2500,
  },
  {
    name: '12/16',
    steps: 3490,
    amt: 2100,
  },
];

const StepsBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} horizontal strokeDasharray={"1"} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="steps" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default StepsBarChart;
