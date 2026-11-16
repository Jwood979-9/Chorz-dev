import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useQuery } from '@tanstack/react-query';

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

export default function DonutChart() {
  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetch('http://127.0.0.1:5001/chorz-dev/us-central1/api/tasks');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const taskData = await response.json();
      return taskData.data || taskData;
    }
  });

  if (isLoading) return <div style={{ width: 200, height: 200, color: 'white' }}>Loading chart...</div>;
  if (isError) return <div style={{ width: 200, height: 200, color: 'red' }}>Error loading data</div>;

  const data = [
    { label: 'Complete', value: tasks.filter(t => t.status === "completed").length , color: '#0a4114' },
    { label: 'Incomplete', value: tasks.length - tasks.filter(t => t.status === "completed").length , color: 'red' },
  ];

  return (
    <PieChart
      series={[{ innerRadius: 50, outerRadius: 100, data, arcLabel: 'value' }]}
      {...settings}
    />
  );
}