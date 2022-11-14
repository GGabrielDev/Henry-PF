import styled from "styled-components";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import { useAppSelector } from "../../../../app/hooks";
import { selectProducts } from "../../../../features/products/productSlice";
import { selectors } from "../../../../features/cart/cartSlice";

const { selectCartItems, selectCartQuantity } = selectors;

const numero = "+543816100078";
const Flotantbutton = () => {
  const espaciado= ["%3A+%24100.000%0D%0A%0D%0A%2A2x%2A+"]
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const item = useAppSelector(selectProducts);
  const cartItems = useAppSelector(selectCartItems);
  const cartQuantity = useAppSelector(selectCartQuantity);
  const carro = [];
  for (let i = 0; i < item?.length; i++) {
    for (let j = 0; j < cartItems.length; j++) {
      if (item[i].id === cartItems[j].product.id) {
        carro.push(item[i]);
      }
    }
  }
  console.log(carro)
  console.log(cartItems)
  const AlertaCorrecta = () => {
    Swal.fire({
      title: "Error",
      text: "Debes tener algun producto en el carrito",
      icon: "error",
      confirmButtonText: "Ok",
    });
  };

  let productosParaWsp = carro
    ? carro.map((producto, index) => `${cartItems[index].quantity}x - ${producto.name}, %0D%0ASubtotal: $${producto.price_local * cartItems[index].quantity} %0D%0A+`)
    : null;

  let totalporahora = carro.map((producto,index)=>

    cartItems[index].quantity * producto.price_local
  )

  let total =`%0D%0A *TOTAL: ${totalporahora.reduce((a, b) => a + b, 0)}*`;

  console.log(total)
  //let datosCliente = user.map((e:any) => `-Nombre: ${e.nombre} \n -Apellido: ${e.apellido}`)
  // console.log(productosParaWsp)


  // console.log(carro)
  const productosConFormatoAmigable = productosParaWsp?.join("%0D%0A+");
  return isAuthenticated && carro.length >= 1 ? (
    <a
      href={
        //  `https://api.whatsapp.com/send?phone=${numero}&text=Hola%E2%98%BA%0D%0A%F0%9F%93%82Me+llamo%3A%0D%0A${user?.given_name}%20${user?.family_name}%0D%0AEstoy+interesado+en+los+siguientes+productos+de+la+pagina%F0%9F%94%A5%3A` +
        //  " " +
         `https://wa.me/${numero}?text=Hola%2C+soy%0D%0A${user?.given_name}%0D%0A%0D%0ALa+direccion+del+envio+es+a%3A+%0D%0ACalifornia+1232%0D%0A%0D%0AQuiero+llevar%0D%0A+%0D%0A` + 
        productosConFormatoAmigable 
        + total
      }
    >
      <Flotantbuttons>
        <div className="botonflotante">
          <div className="flotantelogo">
            <AiOutlineWhatsApp />
          </div>
          <div className="fontantetexto">
            Realizar compra {"("}
            {cartQuantity}
            {")"}
          </div>
        </div>
      </Flotantbuttons>
    </a>
  ) : isAuthenticated === null ? (
    <a onClick={() => loginWithRedirect()}>
      <Flotantbuttons>
        <div className="botonflotante">
          <div className="flotantelogo">
            <AiOutlineWhatsApp />
          </div>
          <div className="fontantetexto">
            Realizar compra {"("}
            {cartQuantity}
            {")"}
          </div>
        </div>
      </Flotantbuttons>
    </a>
  ) : isAuthenticated && carro.length === 0 ? (
    <Flotantbuttons>
      <div className="botonflotante">
        <div className="flotantelogo">
          <AiOutlineWhatsApp />
        </div>
        <div onClick={() => AlertaCorrecta()} className="fontantetexto">
          Realizar compra {"("}
          {cartQuantity}
          {")"}
        </div>
      </div>
    </Flotantbuttons>
  ) : null;
};

const Flotantbuttons = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;

  .botonflotante {
    width: 275px;
    height: 50px;
    background-color: ${({ theme }) => theme.Whatsapp};
    border-radius: 10px;
    position: fixed;
    display: flex;
    align-items: center;
    left: 0;
    right: 0px;
    bottom: 0px;
    margin: auto;
    cursor: pointer;
    margin-bottom: 40px;
  }

  .flotantelogo {
    position: absolute;
    margin-left: 5px;
    width: 50px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    color: ${({ theme }) => theme.light};
  }

  .fontantetexto {
    width: 100%;
    display: flex;
    justify-content: end;
    margin-right: 38px;
    font-size: 17px;
    font-weight: 600;
    color: ${({ theme }) => theme.light};
  }
`;

export default Flotantbutton;
