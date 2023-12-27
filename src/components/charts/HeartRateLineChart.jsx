import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const HeartRateLineChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="heartRate" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

const HeartRateVisualization = () => {
  // Mock heart rate data
  const heartRateData = [
    { timestamp: '2023-07-01T08:00:00', heartRate: 70 },
    { timestamp: '2023-07-01T09:00:00', heartRate: 75 },
    { timestamp: '2023-07-01T10:00:00', heartRate: 80 },
    { timestamp: '2023-07-01T11:00:00', heartRate: 85 },
    { timestamp: '2023-07-01T12:00:00', heartRate: 90 },
    { timestamp: '2023-07-01T13:00:00', heartRate: 88 },
    { timestamp: '2023-07-01T14:00:00', heartRate: 82 },
  ];

  return (
    <div>
      <h2>Heart Rate Line Chart</h2>
      <HeartRateLineChart data={heartRateData} />
    </div>
  );
};

export default HeartRateVisualization;
