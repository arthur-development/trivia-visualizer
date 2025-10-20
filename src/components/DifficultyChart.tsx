import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DifficultyDistribution } from '../types';

interface DifficultyChartProps {
  data: DifficultyDistribution[];
}

const COLORS: Record<string, string> = {
  'Easy': '#4ade80',
  'Medium': '#fbbf24',
  'Hard': '#f87171'
};

const DifficultyChart: React.FC<DifficultyChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ difficulty, count, percent }) => 
            `${difficulty}: ${count} (${(percent * 100).toFixed(0)}%)`
          }
          outerRadius={120}
          fill="#8884d8"
          dataKey="count"
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[entry.difficulty] || '#667eea'} 
            />
          ))}
        </Pie>
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
                    {payload[0].payload.difficulty}
                  </p>
                  <p style={{ margin: '5px 0 0 0' }}>
                    Questions: {payload[0].value}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DifficultyChart;

