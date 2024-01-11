import React from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';

const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];

const TwoLevelPie = (props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={200} height={200}>
        <Pie 
          data={data02} 
          dataKey="value" 
          cx="50%" 
          cy="50%" 
          innerRadius={70} 
          outerRadius={75} 
          fill="#82ca9d" 
          label={false} 
        />
        {/* <text x="50%" y="50%" textAnchor="middle" fill="#fff" dominantBaseline="middle">
          3,590<br/>
          <tspan fontSize="12" fill="#999">Remaining</tspan>
        </text> */}
        {props.children}
      </PieChart>
    </ResponsiveContainer>
  );
}

export default TwoLevelPie;
