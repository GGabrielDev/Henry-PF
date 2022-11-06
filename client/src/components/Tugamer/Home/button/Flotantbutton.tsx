import styled from "styled-components";
import {AiOutlineWhatsApp} from "react-icons/ai"
import { useShoppingCart } from '../../context/SoppingCartContext';
import { useAppSelector } from '../../../../app/hooks';
import { selectProducts } from '../../../../features/products/productSlice';


const numero='+573053721294'
const Flotantbutton = () => {
    const products = useAppSelector(selectProducts);
    const item = useAppSelector(selectProducts);
    const { cartQuantity, cartItems } = useShoppingCart();
    const carro = [];
    for (let i = 0; i < item.length; i++) {
      for (let j = 0; j < cartItems.length; j++) {
        if(item[i].id===cartItems[j].id){
          carro.push(item[i])
        }
        
      }
      
    }
    
    let productosParaWsp =carro? carro.map(
        (producto) => `- ${producto.name}, $${producto.price_local}`
      ):null;
      //let datosCliente = user.map((e:any) => `-Nombre: ${e.nombre} \n -Apellido: ${e.apellido}`)
      const productosConFormatoAmigable = productosParaWsp?.join("\n");
  return (
    
    <a
    href={
      `https://api.whatsapp.com/send?phone=${numero}&text=Hola%E2%98%BA%0D%0A%F0%9F%93%82Me+llamo%3A%0D%0ACarlos%20Arturo%0D%0AEstoy+interesado+en+los+siguientes+productos+de+la+pagina%F0%9F%94%A5%3A` +
      " " + 
      productosConFormatoAmigable
    }
  >
    <Flotantbuttons>
        <div className='botonflotante'>
            <div className="flotantelogo">
            <AiOutlineWhatsApp/>
            </div>
            <div className="fontantetexto">Realizar compra {'('}{cartQuantity}{')'}</div>
        </div>
    </Flotantbuttons>
    </a>
  )
}

const Flotantbuttons = styled.div`
width: 100%;
height: 100vh;
position: fixed;





.botonflotante{
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
    margin-bottom:40px;
}

.flotantelogo{
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

.fontantetexto{
    width: 100%;
    display: flex;
    justify-content: end;
    margin-right: 38px;
    font-size: 17px;
    font-weight: 600;
    color: ${({ theme }) => theme.light};
}

    
`

export default Flotantbutton