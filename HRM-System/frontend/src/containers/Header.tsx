import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import { openRightDrawer } from "../features/common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../utils/globalConstantUtil";
import { RootState } from "@/store"; // Adjust import according to your store setup
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { noOfNotifications, pageTitle } = useSelector(
    (state: RootState) => state.header,
  );
  const openNotification = () => {
    dispatch(
      openRightDrawer({
        header: "Notifications",
        bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
      }),
    );
  };

  const logoutUser = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <div className="navbar sticky top-0 bg-base-100 z-10 shadow-md">
        {/* Menu toggle for mobile view or small screen */}
        <div className="flex-1">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <Bars3Icon className="h-5 inline-block w-5" />
          </label>
          <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
        </div>

        <div className="flex-none">
          {/* Light and dark theme selection toggle */}

          {/* Notification icon */}
          <button
            className="btn btn-ghost ml-4 btn-circle"
            onClick={openNotification}
          >
            <div className="indicator">
              <BellIcon className="h-6 w-6" />
              {noOfNotifications > 0 && (
                <span className="indicator-item badge badge-secondary badge-sm">
                  {noOfNotifications}
                </span>
              )}
            </div>
          </button>

          {/* Profile icon, opening menu on click */}
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  className="mask mask-squircle w-10"
                  src="/logo192.png"
                  alt="DashWind Logo"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="justify-between">
                <Link to="/app/settings-profile">Profile Settings</Link>
              </li>
              <div className="divider mt-0 mb-0"></div>
              <li>
                <button onClick={logoutUser}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
