import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Publicar from "../Pages/Publicar";
import Detalle from "../Pages/Detalle";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/publicar" element={<Publicar />} />
      <Route path="/detalle" element={<Detalle />} />
    </Routes>
  );
};

export default Router;
