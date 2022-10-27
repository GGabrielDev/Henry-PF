import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import { Login } from "../Pages/Login";
import Publicar from "../Pages/Publicar";
import UserGeneral from "../components/Usuario/UserGeneral";
import UserCompras from "../components/Usuario/UserCompras";
import UserEdit from "../components/Usuario/UserEdit";
import UserFavoritos from "../components/Usuario/UserFavoritos";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/publicar" element={<Publicar />} />

      {/* rutas usuario */}
      <Route path="/usuario/general" element={<UserGeneral />} />
      <Route path="/usuario/compras" element={<UserCompras />} />
      <Route path="/usuario/favoritos" element={<UserFavoritos />} />
      <Route path="/usuario/editar" element={<UserEdit />} />

      {/* <Route path="/usuario" element={<Usuario />} /> */}
      <Route path="/auth/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
