import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Publicar from "../Pages/Publicar";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/publicar" element={<Publicar />} />
    </Routes>
  );
};

export default Router;
