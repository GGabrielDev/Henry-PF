import styled from "styled-components";
import {Logo} from "../Navbar"
export function FormRecover(){
    return(

        <>
            <RecoverContainer>
                <div>
                    <Logo>PedirYa</Logo>
                </div>
                Olvidó su contraseña?
                <input className="input__recover" placeholder="Email" name='recover' />
                <button type="submit" className="boton">Recuperar</button>
            </RecoverContainer>
        
        </>
    )
}
const RecoverContainer = styled.div`
position:relative;
width: 450px;
height: 600px;
align-items:center;
align-content:center;
transition: all .2s ease;
box-shadow: 3px 3px 20px ${({ theme }) => theme.secondary};
border-radius: 15px;
display:flex;
flex-flow:column;
border: 3px ${({ theme }) => theme.secondary} solid;
justify-content: space-evenly;


font-size:17px;
.input__recover{
    border:none;
    font-size: 18px;
    margin-left:5px
}
.boton{
    font-size: 18px;
    border:none;
    border-radius:5px;
    cursor:pointer;
    width:140px;
    height:50px;
    background-color:${({ theme }) => theme.primary};
}
`