import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useQuery } from '@tanstack/react-query';

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: false,
};

export default function DonutChart() {
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ['taskStats'],
    queryFn: async () => {
      const response = await fetch('http://127.0.0.1:5001/chorz-dev/us-central1/api/tasks/stats');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const json = await response.json();
      return json.data; 
    }
  });

  if (isLoading) return <div style={{ width: 200, height: 200, color: 'white' }}>Loading chart...</div>;
  if (isError) return <div style={{ width: 200, height: 200, color: 'red' }}>Error loading data</div>;

  const chartData = stats ? [
    { label: 'Complete', value: stats.completed, color: '#0a4114' },
    { label: 'Incomplete', value: stats.incomplete, color: 'red' },
  ] : [];

  return (
    <PieChart
      series={[{ innerRadius: 50, outerRadius: 100, data: chartData, arcLabel: 'value' }]}
      {...settings}
      sx={{'& .MuiChartsLegend-series': {
      color: 'white', 
      }}
    }
    />
  );
}