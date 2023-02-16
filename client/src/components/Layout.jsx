import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="py-4 max-w-6xl mx-auto">
      <Header />
      <div className=" border-b border-1 border-gray-500 mt-4"></div>
      <Outlet />
    </div>
  );
};

export default Layout;
