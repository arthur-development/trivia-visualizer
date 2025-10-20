import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CategoryDistribution } from '../types';

interface CategoryChartProps {
  data: CategoryDistribution[];
}

const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
  const formattedData = data.map(item => ({
    ...item,
    shortCategory: item.category.length > 20 
      ? item.category.substring(0, 20) + '...' 
      : item.category
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={formattedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="shortCategory" 
          angle={-45}
          textAnchor="end"
          height={120}
          interval={0}
          tick={{ fontSize: 12 }}
        />
        <YAxis />
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div style={{
                  backgroundColor: 'white',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>
                    {payload[0].payload.category}
                  </p>
                  <p style={{ margin: '5px 0 0 0', color: '#667eea' }}>
                    Questions: {payload[0].value}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Bar 
          dataKey="count" 
          fill="#667eea" 
          name="Number of Questions"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CategoryChart;

