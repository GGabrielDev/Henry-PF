import { Route, Routes, Outlet } from "react-router-dom";
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
import { actions, selectors } from "../features/users/userSlice";
import CheckoutBasic from "../Pages/Compra/CheckoutBasic";
import CheckoutPremium from "../Pages/Compra/CheckoutPremium";
import CheckoutMedium from "../Pages/Compra/CheckoutMedium";
import EditarUsuario from "../Pages/Usuario/editarUsuario"

const { getUserByEmail, createUser } = actions;
const { selectError, selectStatus } = selectors;



const Router = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectError);
    const status = useAppSelector(selectStatus)
    const {isAuthenticated, user} = useAuth0(); 
    useEffect(() => {if(isAuthenticated && user && user.email && !error.message && status === "loggedOut"){
      dispatch(getUserByEmail(user.email))
    } else {if(error.message && error.message === "User not found" && user)
      dispatch(createUser(user))
    }

    },[isAuthenticated, user, error]) 
  return (
    <Routes>
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
     
      

      {isAuthenticated ?  
      <>      
      <Route path="/usuario/*" element={<UserGeneral />} />
      <Route path="/usuario/compras" element={<UserCompras />} />
      <Route path="/usuario/compras/detalle" element={<UserCompraDetalle />} />
      <Route path="/usuario/favoritos" element={<UserFavoritos />} />      
      <Route path="/checkout/premium" element={<CheckoutPremium />} />
      <Route path="/checkout/medium" element={<CheckoutMedium />} />
      <Route path="/checkout/basic" element={<CheckoutBasic />} />
      <Route path="/usuario/editUser" element={<EditarUsuario/>}/>
      
      
      </>
      :
      null
      }

      {isAuthenticated /*ACA DEBERIA Ir && user.isPremium */  ?        <>      
      <Route path="/tugamer/publicar" element={<Publicar />} /> 
      <Route path="/tuhamburguesa/publicar" element={<PublicarH />} />
      <Route path="/usuario/editar/producto/:productId" element={<EditProduct />} />
      
      </>
      :
      null    
      }
      {isAuthenticated && user?.email === "Henryfygrup@gmail.com"?  
      <>
      {/* IRIA LA RUTA DE ELIMINACION DE USUARIO*/}
      </>
      :
      null    
      }
      </>
    </Routes>
  );
};
      

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
      <Route path="/checkout/premium" element={<CheckoutPremium />} />
      <Route path="/checkout/medium" element={<CheckoutMedium />} />
      <Route path="/checkout/basic" element={<CheckoutBasic />} />
      */}

export default Router;