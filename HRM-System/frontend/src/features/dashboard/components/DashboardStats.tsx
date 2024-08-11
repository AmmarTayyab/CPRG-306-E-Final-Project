import React from "react";

// Define the types for props
interface DashboardStatsProps {
  title: string;
  icon: React.ReactNode; // Use React.ReactNode for icon, as it can be any valid React node
  value: string | number; // Value can be either a string or a number
  colorIndex: number; // Index for color selection
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  title,
  icon,
  value,
  colorIndex,
}) => {
  const COLORS = ["primary", "secondary"]; // Adjust the color names as needed

  return (
    <div className="stats shadow">
      <div className="stat">
        <div
          className={`stat-figure dark:text-slate-300 text-${COLORS[colorIndex % COLORS.length]}`}
        >
          {icon}
        </div>
        <div className="stat-title dark:text-slate-300">{title}</div>
        <div
          className={`stat-value dark:text-slate-300 text-${COLORS[colorIndex % COLORS.length]}`}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
