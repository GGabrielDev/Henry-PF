import { Route, Routes, Outlet } from "react-router-dom";
import Landingpage from "../Pages/Landingpage";
import Error from "../Pages/Error";
import UserGeneral from "../Pages/Usuario/UserGeneral";
import UserCompras from "../Pages/Usuario/UserCompras";
import UserCompraDetalle from "../Pages/Usuario/UserComprasDetalle";
import UserEdit from "../Pages/Usuario/UserEdit";
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
import Pago from "../Pages/Compra/Pago";
import EditProduct from "../Pages/Usuario/EditProduct";
import { useAuth0 } from "@auth0/auth0-react";

const Router = () => {
    const {isAuthenticated,user} = useAuth0();  
  return (
    <Routes>
      <>
      {isAuthenticated === false ? 
      <>      
      <Route path="/" element={<Landingpage />} />
      <Route path="/*" element={<Error />} />
      <Route path="/tugamer" element={<Tugamer />} />
      <Route path="/tugamer/detalle/:productId" element={<Detalle />} />
      <Route path="/tugamer/*" element={<Error404 />} />
      <Route path="/tuhamburguesa" element={<TuHamburguesa />} />
      <Route path="/tuhamburguesa/detalle/:productId" element={<DetalleH />} />
      <Route path="/tuhamburguesa/*" element={<Error404H />} />
      <Route path="auth/recover" element={<Recover />} />
      <Route path="auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
      </>
      :
      null    
      } 
      {isAuthenticated ?  
      <>
      <Route path="/" element={<Landingpage />} />
      <Route path="/*" element={<Error />} />
      <Route path="/tugamer" element={<Tugamer />} />
      <Route path="/tugamer/detalle/:productId" element={<Detalle />} />
      <Route path="/tugamer/*" element={<Error404 />} />
      <Route path="/tuhamburguesa" element={<TuHamburguesa />} />
      <Route path="/tuhamburguesa/detalle/:productId" element={<DetalleH />} />
      <Route path="/tuhamburguesa/*" element={<Error404H />} />
      <Route path="auth/recover" element={<Recover />} />
      <Route path="auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/usuario/*" element={<UserGeneral />} />
      <Route path="/usuario/compras" element={<UserCompras />} />
      <Route path="/usuario/compras/detalle" element={<UserCompraDetalle />} />
      <Route path="/usuario/favoritos" element={<UserFavoritos />} />      
      <Route path="/pago" element={<Pago />} />
      </>
      :
      null    
      }
      {isAuthenticated /*ACA DEBERIA Ir && user.isPremium */  ?  
      <>
      <Route path="/" element={<Landingpage />} />
      <Route path="/*" element={<Error />} />
      <Route path="/tugamer" element={<Tugamer />} />
      <Route path="/tugamer/detalle/:productId" element={<Detalle />} />
      <Route path="/tugamer/*" element={<Error404 />} />
      <Route path="/tuhamburguesa" element={<TuHamburguesa />} />
      <Route path="/tuhamburguesa/detalle/:productId" element={<DetalleH />} />
      <Route path="/tuhamburguesa/*" element={<Error404H />} />
      <Route path="auth/recover" element={<Recover />} />
      <Route path="auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/usuario/*" element={<UserGeneral />} />
      <Route path="/usuario/compras" element={<UserCompras />} />
      <Route path="/usuario/compras/detalle" element={<UserCompraDetalle />} />
      <Route path="/usuario/favoritos" element={<UserFavoritos />} />      
      <Route path="/pago" element={<Pago />} />
      <Route path="/tugamer/publicar" element={<Publicar />} /> 
      <Route path="/tuhamburguesa/publicar" element={<PublicarH />} />
      <Route path="/usuario/editar/producto/:productId" element={<EditProduct />} />
      <Route path="/usuario/editar" element={<UserEdit />} />
      </>
      :
      null    
      }
      {isAuthenticated && user?.email === "Henryfygrup@gmail.com"?  
      <>
      <Route path="/" element={<Landingpage />} />
      <Route path="/*" element={<Error />} />
      <Route path="/tugamer" element={<Tugamer />} />
      <Route path="/tugamer/detalle/:productId" element={<Detalle />} />
      <Route path="/tugamer/*" element={<Error404 />} />
      <Route path="/tuhamburguesa" element={<TuHamburguesa />} />
      <Route path="/tuhamburguesa/detalle/:productId" element={<DetalleH />} />
      <Route path="/tuhamburguesa/*" element={<Error404H />} />
      <Route path="auth/recover" element={<Recover />} />
      <Route path="auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/usuario/*" element={<UserGeneral />} />
      <Route path="/usuario/compras" element={<UserCompras />} />
      <Route path="/usuario/compras/detalle" element={<UserCompraDetalle />} />
      <Route path="/usuario/favoritos" element={<UserFavoritos />} />
      <Route path="/usuario/editar" element={<UserEdit />} />
      <Route path="/pago" element={<Pago />} />
      <Route path="/tugamer/publicar" element={<Publicar />} /> 
      <Route path="/tuhamburguesa/publicar" element={<PublicarH />} />
      <Route path="/usuario/editar/producto/:productId" element={<EditProduct />} />
      </>
      :
      null    
      }

      
      </> 
      {/*
      
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

      <Route path="/pago" element={<Pago />} /> 
      */}
     
    </Routes>
  );
};

export default Router;
