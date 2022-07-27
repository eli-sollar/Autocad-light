import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "../pages/Create";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Playground from "../pages/Playground";
import Autocad from "../jAutocad/Autocad.jsx"
import Planners from "../pages/Planners";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/test" element={<Playground />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Planners" element={<Planners />} />
        <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/Autocad" element={<Autocad />} /> 
        {/*          steps              */}
        <Route exact  path="/create" element={<Create />} />
        <Route exact  path="/create/:stepId" element={<Create />} />
        <Route exact  path="/create/:stepId/:projectId" element={<Create />} />
       
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
