import React from "react";
import { Outlet } from "react-router-dom";

const Authlayout = () => {
  return (
    <div>
      Authlayout
      <Outlet />
    </div>
  );
};

export default Authlayout;
