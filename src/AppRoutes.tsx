
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Projects from "./components/projects"

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Projects />} />
        
      </Routes>
    </Router>
  );
};

export default AppRoutes;
