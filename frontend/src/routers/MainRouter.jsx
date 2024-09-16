import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideComponent from "../components/SideComponent";
import HeaderComponent from "../components/HeaderComponent";
import MainDashboard from "../screens/SideScreens/dashboard/MainDashBoard";
import MainInventory from "../screens/SideScreens/inventory/MainInventory";
import MainReports from "../screens/SideScreens/reports/MainReports";
import MainSuppliers from "../screens/SideScreens/suppliers/MainSuppliers";
import MainOrders from "../screens/SideScreens/orders/MainOrders";
import MainManageStore from "../screens/SideScreens/managestore/MainManageStore";
import Setting from "../screens/SideScreens/settings/Setting";
import Logout from "../screens/SideScreens/LogOut";

const MainRouter = () => {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <div className="flex">
          <SideComponent />
          <div className=" flex justify-center items-center bg-slate-400 w-4/5">
            <Routes>
              <Route path="/" element={<MainDashboard />} />
              <Route path="/inventory" element={<MainInventory />} />
              <Route path="/reports" element={<MainReports />} />
              <Route path="/suppliers" element={<MainSuppliers />} />
              <Route path="/orders" element={<MainOrders />} />
              <Route path="/manage-store" element={<MainManageStore />} />
              <Route path="/settings" element={<Setting />} />
              <Route path="/log-out" element={<Logout />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default MainRouter;
