import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <h1>MainLayout</h1>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
