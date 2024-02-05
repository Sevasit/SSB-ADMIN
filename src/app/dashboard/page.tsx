"use client";
import React from "react";
import TopCard from "../components/TopChart";
import BarChart from "../components/BarChart";
import RecentTask from "../components/RecentTask";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="p-4">
      <TopCard />
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <BarChart />
        <RecentTask />
      </div>
    </div>
  );
};

export default Dashboard;
