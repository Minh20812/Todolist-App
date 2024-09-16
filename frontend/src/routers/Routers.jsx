import React from "react";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";
import { Theme } from "@radix-ui/themes";

const Routers = () => {
  return (
    <>
      <Theme>{1 < 2 ? <AuthRouter /> : <MainRouter />}</Theme>
    </>
  );
};

export default Routers;
