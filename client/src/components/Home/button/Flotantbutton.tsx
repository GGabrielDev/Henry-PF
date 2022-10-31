import React from 'react'
import styled from "styled-components";
import {AiOutlineWhatsApp} from "react-icons/ai"

const Flotantbutton = () => {
  return (
    <Flotantbuttons>
        <div className='botonflotante'>
            <div className="flotantelogo">
            <AiOutlineWhatsApp/>
            </div>
            <div className="fontantetexto">Realizar compra ()</div>
        </div>
    </Flotantbuttons>
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