import React from "react";
import { Link } from "react-router-dom";

const SideComponent = () => {
  return (
    <>
      <div className=" flex flex-col bg-slate-100 h-screen w-1/5 items-center justify-between p-8">
        <div className=" flex flex-col">
          <Link to={"/"}>DashBoard</Link>
          <Link to={"/inventory"}>Inventory</Link>
          <Link to={"/reports"}>Reports</Link>
          <Link to={"/suppliers"}>Suppliers</Link>
          <Link to={"/orders"}>Orders</Link>
          <Link to={"/manage-store"}>Manage Store</Link>
        </div>

        <div className=" flex flex-col">
          <Link to={"/settings"}>Settings</Link>
          <Link to={"/log-out"}>LogOut</Link>
        </div>
      </div>
    </>
  );
};

export default SideComponent;
