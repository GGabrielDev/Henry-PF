import { Route, Routes } from "react-router-dom";
import  {Register}  from "../Pages/Register";
import Home from "../Pages/Home";
import { Login } from "../Pages/Login";
import Publicar from "../Pages/Publicar";
import Usuario from "../Pages/Usuario";
import { Recover } from "../Pages/Recover";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/publicar" element={<Publicar />} />
      <Route path="/usuario" element={<Usuario />} />
      <Route path="/auth/login" element={<Login />} />


      <Route path="/auth/recover" element={<Recover />} />
      <Route path="auth/register" element={<Register />} />
    </Routes>
  );
};

export default Router;
