"use client";
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
import useGetTaskCountToGraph from "../../../hooks/task/useGetTaskCountToGraph";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const {
    data: dataTaskCountToGraph = [],
    isLoading,
    isError,
  } = useGetTaskCountToGraph();

  const [chartData, setChartData] = useState<any>({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    let labels: any = [];
    let counts: any = [];
    for (let i = 0; i < dataTaskCountToGraph.length; i++) {
      labels.push(dataTaskCountToGraph[i].type);
      counts.push(dataTaskCountToGraph[i].count);
    }
    setChartData({
      labels: labels,
      datasets: [
        {
          label: "จำนวนปัญหา",
          data: counts,
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
          text: "สรุปปัญหาที่เกิดขึ้นในแต่ละประเภท",
          font: {
            size: 25,
          },
          color: "black",
        },
        maintainAspectRatio: false,
        responsive: true,
      },
    });
  }, [dataTaskCountToGraph]);

  return (
    <div className="w-full md:col-span-2 relative lg:h-[78vh] h-[58vh] m-auto p-4 border rounded-lg bg-[#f0f4f2]">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
