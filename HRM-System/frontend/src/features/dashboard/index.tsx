import React from "react";
import { useDispatch } from "react-redux";
import DashboardStats from "./components/DashboardStats";
import DashboardTopBar from "./components/DashboardTopBar";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { BuildingOffice2Icon } from "@heroicons/react/20/solid";

// Define the type for the stats data
interface StatsData {
  title: string;
  value: string;
  icon: React.ReactNode;
}

// Define your stats data with the type
const statsData: StatsData[] = [
  {
    title: "Employees",
    value: "30",
    icon: <UserGroupIcon className="w-8 h-8" />,
  },
  {
    title: "Departments",
    value: "3",
    icon: <BuildingOffice2Icon className="w-8 h-8" />,
  },
  {
    title: "Job Positions",
    value: "10",
    icon: <BriefcaseIcon className="w-8 h-8" />,
  },
  {
    title: "Active Employees",
    value: "28",
    icon: <UsersIcon className="w-8 h-8" />,
  },
];

const Dashboard: React.FC = () => {
  useDispatch();
  return (
    <>
      {/* ---------------------- Select Period Content ------------------------- */}
      <DashboardTopBar />

      {/* ---------------------- Different stats content 1 ------------------------- */}
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => (
          <DashboardStats key={k} {...d} colorIndex={k} />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
