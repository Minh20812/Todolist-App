import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideComponent from "../components/SideComponent";
import HeaderComponent from "../components/HeaderComponent";
import MainDashboard from "../screens/SideScreens/dashboard/MainDashBoard";
import MainAddTask from "../screens/SideScreens/addTask/MainAddTask";
import MainSearch from "../screens/SideScreens/search/MainSearch";
import MainInbox from "../screens/SideScreens/inbox/MainInbox";
import MainToday from "../screens/SideScreens/today/MainToday";
import MainUpcoming from "../screens/SideScreens/upcoming/MainUpcoming";
import FilterLabels from "../screens/SideScreens/filter&labels/Filter&Labels";
import MainComplete from "../screens/SideScreens/complete/MainComplete";

const MainRouter = () => {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <div className="flex">
          <div className=" w-1/6">
            <SideComponent />
          </div>
          <div className=" flex justify-center items-center bg-slate-400 h-screen w-5/6">
            <Routes>
              <Route path="/" element={<MainDashboard />} />
              <Route path="/addTask" element={<MainAddTask />} />
              <Route path="/search" element={<MainSearch />} />
              <Route path="/inbox" element={<MainInbox />} />
              <Route path="/today" element={<MainToday />} />
              <Route path="/upcoming" element={<MainUpcoming />} />
              <Route path="/filter&labels" element={<FilterLabels />} />
              <Route path="/completed" element={<MainComplete />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default MainRouter;
