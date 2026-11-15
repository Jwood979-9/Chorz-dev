import { PieChart } from '@mui/x-charts/PieChart';







const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
  
};

export default function DonutChart({tasks}) {

    const data = [
  { label: 'Complete', value: tasks.filter(t => t.status === "completed").length , color: '#0a4114' },
  { label: 'Incomplete', value: tasks.length - tasks.filter(t => t.status === "completed").length , color: '#121A21' },

];
  return (
    <PieChart
      series={[{ innerRadius: 50, outerRadius: 100, data, arcLabel: 'value' }]}
      {...settings}
   
    />
  );
}
