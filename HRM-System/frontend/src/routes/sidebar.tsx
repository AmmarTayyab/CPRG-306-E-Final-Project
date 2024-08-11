import React from "react";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import { BuildingOffice2Icon } from "@heroicons/react/20/solid";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },
  {
    path: "/app/employees", // url
    icon: <UserGroupIcon className={iconClasses} />, // icon component
    name: "Employees", // name that appear in Sidebar
  },
  {
    path: "/app/departments", // url
    icon: <BuildingOffice2Icon className={iconClasses} />, // icon component
    name: "Departments", // name that appear in Sidebar
  },
  {
    path: "/app/positions", // url
    icon: <BriefcaseIcon className={iconClasses} />, // icon component
    name: "Job Positions", // name that appear in Sidebar
  },
  {
    path: "", //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, // icon component
    name: "Settings", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/settings-profile", //url
        icon: <UserIcon className={submenuIconClasses} />, // icon component
        name: "Profile", // name that appear in Sidebar
      },
    ],
  },
];

export default routes;
