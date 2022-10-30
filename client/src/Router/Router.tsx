import { Route, Routes } from "react-router-dom";
import { Register } from "../Pages/Register";
import Home from "../Pages/Home";
import { Login } from "../Pages/Login";
import Publicar from "../Pages/Publicar";
import UserGeneral from "../components/Usuario/UserGeneral";
import UserCompras from "../components/Usuario/UserCompras";
import UserCompraDetalle from "../components/Usuario/UserComprasDetalle";
import UserEdit from "../components/Usuario/UserEdit";
import UserFavoritos from "../components/Usuario/UserFavoritos";
import { Recover } from "../Pages/Recover";
import Error404 from "../components/Error/Error404";
import Detalle from "../Pages/Detalle";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/publicar" element={<Publicar />} />
      <Route path="/detalle" element={<Detalle />} />
      

      {/* rutas usuario */}
      <Route path="/usuario/general" element={<UserGeneral />} />
      <Route path="/usuario/compras" element={<UserCompras />} />
      <Route path="/usuario/compras/detalle" element={<UserCompraDetalle />} />
      <Route path="/usuario/favoritos" element={<UserFavoritos />} />
      <Route path="/usuario/editar" element={<UserEdit />} />

      {/* <Route path="/usuario" element={<Usuario />} /> */}
      {/* rutas autenticacion usuario */}
      <Route path="auth/recover" element={<Recover />} />
      <Route path="auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />

      {/* error en la ruta */}

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default Router;
