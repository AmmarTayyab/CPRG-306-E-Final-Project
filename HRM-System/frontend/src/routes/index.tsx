// All components mapping with path for internal routes

import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Employees = lazy(() => import("../pages/protected/Employees"));
const Departments = lazy(() => import("../pages/protected/Departments"));
const Positions = lazy(() => import("../pages/protected/Positions"));
const Profile = lazy(() => import("../pages/protected/Profile"));

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/employees",
    component: Employees,
  },
  {
    path: "/departments",
    component: Departments,
  },
  {
    path: "/positions",
    component: Positions,
  },
  {
    path: "/settings-profile",
    component: Profile,
  },
];

export default routes;
