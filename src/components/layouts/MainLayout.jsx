import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-stretch">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
