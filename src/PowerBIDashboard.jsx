import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 27 },
  { name: 'Apr', value: 25 },
  { name: 'May', value: 35 },
];

export default function PowerBIDashboard() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Power BI-Style Dashboard</h2>
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
