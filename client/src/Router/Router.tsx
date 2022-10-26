
import { Route, Routes } from "react-router-dom";


import Home from "../Pages/Home";
import { Login } from "../Pages/Login";
import Publicar from "../Pages/Publicar";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/publicar" element={<Publicar />} />
      <Route path="/auth/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
