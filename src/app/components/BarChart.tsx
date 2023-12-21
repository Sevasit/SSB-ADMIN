import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [chartData, setChartData] = useState<any>({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "จำนวนปัญหา",
          data: [10, 0, 5, 25, 9, 10, 11],
          backgroundColor: "#00DC82",
          color: "#fff",
        },
      ],
    });

    setChartOptions({
      data: chartData,
      plugins: {
        title: {
          display: true,
          text: "Report of week",
          font: {
            size: 25,
          },
          color: "black",
        },
        maintainAspectRatio: false,
        responsive: true,
      },
    });
  }, []);

  return (
    <div className="w-full md:col-span-2 relative lg:h-[78vh] h-[58vh] m-auto p-4 border rounded-lg bg-[#f0f4f2]">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
