// types.ts
import React, { ReactNode } from "react";

interface RouteType {
  path: string;
  icon: ReactNode;
  name: string;
  submenu?: any;
}

interface SubmenuItem {
  path: string;
  icon: React.ReactNode;
  name: string;
}

interface SidebarSubmenuProps {
  submenu: SubmenuItem[];
  name: string;
  icon: React.ReactNode;
}

export type { RouteType, SubmenuItem, SidebarSubmenuProps };
