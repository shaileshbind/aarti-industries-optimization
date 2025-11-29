"use client";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Plugin } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export const TopLinePlugin: Plugin<"bar"> = {
  id: "topLine",
  afterDatasetsDraw(chart) {
    const ctx = chart.ctx;
    const dataset = chart.getDatasetMeta(0);
    const yScale = chart.scales.y;

    // Text placed safely inside chart (won't get cut off)
    const textY = yScale.top ;

    ctx.save();
    ctx.strokeStyle = "#D0D0D0";
    ctx.lineWidth = 1;

    dataset.data.forEach((bar, index: number) => {
      const value = chart.data.datasets[0].data[index] as number;

      const barX = bar.x;
      const barTop = bar.y;

      // Measure text to calculate its width when rotated
      ctx.font = "14px sans-serif";
      const textWidth = ctx.measureText(value.toLocaleString()).width;

      // Text center position (vertical text, so textWidth becomes height)
      const textCenterY = textY + textWidth / 2;

      // Check if bar is at full height (bar top is at or very close to scale top)
      const isFullHeight = barTop <= yScale.top + 5; // 5px tolerance

      if (!isFullHeight) {
        // Line goes from bar top to start of text (with small gap)
        const lineEndY = textY - 5;

        // Draw thin vertical line from bar to text
        ctx.beginPath();
        ctx.moveTo(barX, barTop);
        ctx.lineTo(barX, lineEndY);
        ctx.stroke();
      }

      // Draw vertical text at top (centered)
      ctx.save();
      ctx.translate(barX, textCenterY);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = "#4C5861";
      ctx.textAlign = "center";
      ctx.fillText(value.toLocaleString(), 0, 0);
      ctx.restore();
    });
    ctx.restore();
  },
};

interface InvestorBarChartProps {
  labels: string[];
  data: number[];
  backgroundColor?: string;
}

export default function InvestorBarChart({
  labels,
  data,
  backgroundColor = "#D9D9D9",
}: InvestorBarChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [backgroundColor],
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false },
        border: { display: false },
        ticks: { display: false },
      },
      x: {
        grid: { display: false },
        border: { display: true },
      },
    },
    plugins: {
      legend: { display: false },
      datalabels: {
        anchor: "end",
        align: "end",
        color: "#4C5861",
        font: { size: 14 },
      },
    },
  };

  return (
    <div style={{ height: "320px" }}>
      <Bar data={chartData} options={options} plugins={[TopLinePlugin]} />
    </div>
  );
}