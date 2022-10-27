import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Publicar from "../Pages/Publicar";
import Usuario from "../Pages/Usuario";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/publicar" element={<Publicar />} />
      <Route path="/suario" element={<Usuario />} />
    </Routes>
  );
};

export default Router;
