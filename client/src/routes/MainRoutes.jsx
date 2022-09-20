import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Applications from "../pages/Applications";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </>
  );
};
export { MainRoutes };
