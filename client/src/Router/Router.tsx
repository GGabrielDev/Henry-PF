import { Route, Routes, Outlet } from "react-router-dom";
import { Register } from "../Pages/Tugamer/Register";
import Tugamer from "../Pages/Tugamer/Tugamer";
import { Login } from "../Pages/Tugamer/Login";
import Publicar from "../Pages/Tugamer/Publicar";
import UserGeneral from "../Pages/Usuario/UserGeneral";
import UserCompras from "../Pages/Usuario/UserCompras";
import UserCompraDetalle from "../Pages/Usuario/UserComprasDetalle";
import UserEdit from "../Pages/Usuario/UserEdit";
import UserFavoritos from "../Pages/Usuario/UserFavoritos";
import { Recover } from "../Pages/Tugamer/Recover";
import Error404 from "../Pages/Error404";
import Detalle from "../Pages/Tugamer/Detalle";
import Landingpage from "../Pages/Landingpage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />

      <Route path="/tugamer" element={<Tugamer />} />
      <Route path="/tugamer/publicar" element={<Publicar />} />
      <Route path="/tugamer/detalle/:productId" element={<Detalle />} />

      {/* rutas usuario */}
      <Route path="/usuario/*" element={<UserGeneral />} />
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

      <Route path="/tugamer/*" element={<Error404 />} />
    </Routes>
  );
};

export default Router;
