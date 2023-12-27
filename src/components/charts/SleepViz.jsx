import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const SleepBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="startDate" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="durationInMinutes" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const transformData = (data) => {
  return data.map((item) => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    const durationInMinutes = Math.floor((endDate - startDate) / (1000 * 60)); // Calculate duration in minutes

    return {
      ...item,
      durationInMinutes,
    };
  });
};

const SleepVisualization = ({ data }) => {
  const transformedData = transformData(data);

  return (
    <div>
      <h2>Sleep Duration Bar Chart</h2>
      <SleepBarChart data={transformedData} />
    </div>
  );
};

export default SleepVisualization;
