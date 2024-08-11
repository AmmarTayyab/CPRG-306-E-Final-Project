import React, { useEffect, useState } from "react";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import { Link, useLocation } from "react-router-dom";
import { SidebarSubmenuProps } from "@/containers/Containers";

const SidebarSubmenu: React.FC<SidebarSubmenuProps> = ({
  submenu,
  name,
  icon,
}) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    if (submenu.some((item) => item.path === location.pathname)) {
      setIsExpanded(true);
    }
  }, [location.pathname, submenu]);

  return (
    <div className="flex flex-col">
      {/** Route header */}
      <div className="w-full block" onClick={() => setIsExpanded(!isExpanded)}>
        {icon} {name}
        <ChevronDownIcon
          className={`w-5 h-5 mt-1 float-right transition-transform duration-500 ${isExpanded ? "rotate-180" : ""}`}
        />
      </div>

      {/** Submenu list */}
      <div className={`w-full ${isExpanded ? "" : "hidden"}`}>
        <ul className="menu menu-compact">
          {submenu.map((m, k) => (
            <li key={k}>
              <Link to={m.path}>
                {m.icon} {m.name}
                {location.pathname === m.path && (
                  <span
                    className="absolute mt-1 mb-1 inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary"
                    aria-hidden="true"
                  ></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarSubmenu;
