'use client';

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  symbol: string;
  closingPrices: number[];
  labels: string[];
};

function PriceChart({ symbol, closingPrices, labels }: Props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const
      },
      title: {
        display: true,
        text: 'Historical price chart'
      }
    }
  };
  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: symbol,
          data: closingPrices,
          borderColor: '#f4bd50',
          backgroundColor: '#f4bd50'
        }
      ]
    }),
    [closingPrices, symbol, labels]
  );

  return <Line options={options} data={data} redraw />;
}

export default PriceChart;
