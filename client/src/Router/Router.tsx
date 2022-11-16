import { Route, Routes } from "react-router-dom";
import Landingpage from "../Pages/Landingpage";
import Error from "../Pages/Error";
import UserGeneral from "../Pages/Usuario/UserGeneral";
import UserCompras from "../Pages/Usuario/UserCompras";
import UserCompraDetalle from "../Pages/Usuario/UserComprasDetalle";
import UserFavoritos from "../Pages/Usuario/UserFavoritos";
import Error404 from "../Pages/Tugamer/Error404";
import { Register } from "../Pages/Tugamer/Register";
import Detalle from "../Pages/Tugamer/Detalle";
import Publicar from "../Pages/Tugamer/Publicar";
import { Recover } from "../Pages/Tugamer/Recover";
import { Login } from "../Pages/Tugamer/Login";
import Tugamer from "../Pages/Tugamer/Tugamer";
import Error404H from "../Pages/TuHamburguesa/Error404";
import DetalleH from "../Pages/TuHamburguesa/Detalle";
import PublicarH from "../Pages/TuHamburguesa/Publicar";
import TuHamburguesa from "../Pages/TuHamburguesa/TuHamburguesa";
import EditProduct from "../Pages/Usuario/EditProduct";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { actions, selectors, UserType } from "../features/users/userSlice";

import CheckoutBasic from "../Pages/Compra/CheckoutBasic";
import CheckoutPremium from "../Pages/Compra/CheckoutPremium";
import CheckoutMedium from "../Pages/Compra/CheckoutMedium";
import EditarUsuario from "../Pages/Usuario/editarUsuario";
import EditSeller from "../Pages/Usuario/editarSeller";
import UserEdit from "../Pages/Usuario/UserEdit";
import VerUsuarios from "../Pages/Usuario/verUsuarios";
import VerTiendas from "../Pages/Usuario/verTiendas";

import ShopContext from "../Pages/Shop/ShopContext";
import Home from "../Pages/Shop/Home";
import Details from "../Pages/Shop/Details";
import PublicarModular from "../Pages/Shop/Publicar";

import Termsandconditions from "../Pages/termsandconditions";
import Privacidad from "../Pages/Privacidad";
import QuienesSomos from "../Pages/QuienesSomos";
import Sugerencias from "../Pages/Sugerencias";

const { getUserByEmail, createUser } = actions;
const { selectError, selectStatus, selectUser } = selectors;

const Router = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);
  const status = useAppSelector(selectStatus);
  const usuario = useAppSelector(selectUser) as UserType;
  const { isAuthenticated, user } = useAuth0();
  useEffect(() => {
    if (
      isAuthenticated &&
      user &&
      user.email &&
      !error.message &&
      status === "loggedOut"
    ) {
      dispatch(getUserByEmail(user.email));
    } else {
      if (error.message && error.message === "User not found" && user)
        dispatch(createUser(user));
    }
  }, [isAuthenticated, user, error]);
  return (
    <Routes>
      <>
        <Route path="/" element={<Landingpage />} />

        <Route path="/terms" element={<Termsandconditions />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/nosotros" element={<QuienesSomos />} />
        <Route path="/sugerencias" element={<Sugerencias />} />
        <Route path="/*" element={<Error />} />

        <Route path="/tugamer" element={<Tugamer />} />
        <Route path="/tugamer/detalle/:productId" element={<Detalle />} />
        <Route path="/tugamer/*" element={<Error404 />} />
        <Route path="/tuhamburguesa" element={<TuHamburguesa />} />
        <Route
          path="/tuhamburguesa/detalle/:productId"
          element={<DetalleH />}
        />
        <Route path="/tuhamburguesa/*" element={<Error404H />} />
        <Route path="auth/recover" element={<Recover />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/checkout/premium" element={<CheckoutPremium />} />
        <Route path="/checkout/medium" element={<CheckoutMedium />} />
        <Route path="/checkout/basic" element={<CheckoutBasic />} />

        <Route path="/shop/:shopName" element={<ShopContext />}>
          <Route index element={<Home />} />
          <Route path="detalle/:productId" element={<Details />} />
          {isAuthenticated && usuario.sellerId ? (
            <Route path="publicar" element={<PublicarModular />} />
          ) : null}
        </Route>

        {isAuthenticated ? (
          <>
            <Route path="/usuario/*" element={<UserGeneral />} />
            <Route path="/usuario/compras" element={<UserCompras />} />
            <Route
              path="/usuario/compras/detalle"
              element={<UserCompraDetalle />}
            />
            <Route path="/usuario/favoritos" element={<UserFavoritos />} />
            <Route path="/usuario/editUser" element={<EditarUsuario />} />
          </>
        ) : null}

        {isAuthenticated && usuario.sellerId ? (
          <>
            <Route path="/tugamer/publicar" element={<Publicar />} />
            <Route path="/tuhamburguesa/publicar" element={<PublicarH />} />
            <Route path="/usuario/editar/producto/" element={<UserEdit />} />
            <Route path="/usuario/editSeller" element={<EditSeller />} />
            <Route
              path="/usuario/editar/producto/:productId"
              element={<EditProduct />}
            />
          </>
        ) : null}

        {isAuthenticated && user?.email === "" ? (
          <>
            <Route path="/tugamer/publicar" element={<Publicar />} />
            <Route path="/tuhamburguesa/publicar" element={<PublicarH />} />
            <Route path="/usuario/editar/producto/" element={<UserEdit />} />
            <Route path="/usuario/editSeller" element={<EditSeller />} />
            <Route
              path="/usuario/editar/producto/:productId"
              element={<EditProduct />}
            />
            <Route path="/usuario/usuarios" element={<VerUsuarios />}></Route>
            <Route path="/usuario/tiendas" element={<VerTiendas />}></Route>
            {/* IRIA LA RUTA DE ELIMINACION DE USUARIO*/}
          </>
        ) : null}
      </>
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

/*
      
      PORTAFOLIO  

      <Route path="/" element={<Landingpage />} />
      <Route path="/*" element={<Error />} />

       TUGAMER 
      <Route path="/tugamer" element={<Tugamer />} />
          
      <Route path="/tugamer/publicar" element={<Publicar />} />      
      <Route path="/tugamer/detalle/:productId" element={<Detalle />} />
      <Route path="/tugamer/*" element={<Error404 />} />

      TUHAMBURGUESA 

      <Route path="/tuhamburguesa" element={<TuHamburguesa />} />
      <Route path="/tuhamburguesa/publicar" element={<PublicarH />} />
      <Route path="/tuhamburguesa/detalle/:productId" element={<DetalleH />} />
      <Route path="/tuhamburguesa/*" element={<Error404H />} />

       rutas usuario 

      <Route path="/usuario/*" element={<UserGeneral />} />
      <Route path="/usuario/compras" element={<UserCompras />} />
      <Route path="/usuario/compras/detalle" element={<UserCompraDetalle />} />
      <Route path="/usuario/favoritos" element={<UserFavoritos />} />
      <Route path="/usuario/editar" element={<UserEdit />} />
      <Route
        path="/usuario/editar/producto/:productId"
        element={<EditProduct />}
      />

       <Route path="/usuario" element={<Usuario />} /> 
       rutas autenticacion usuario 
      <Route path="auth/recover" element={<Recover />} />
      <Route path="auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />

       PAGO 
      <Route path="/checkout/premium" element={<CheckoutPremium />} />
      <Route path="/checkout/medium" element={<CheckoutMedium />} />
      <Route path="/checkout/basic" element={<CheckoutBasic />} />
      */

export default Router;
