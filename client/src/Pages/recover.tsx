import styled from "styled-components";
import {Logo} from "../components/Tugamer/Navbar"
export function FormRecover(){
    return(

        <>
            <RecoverContainer>
                <form  autoComplete="off">
                <div>
                    <Logo>PedirYa</Logo>
                </div>
                Olvidó su contraseña?
                <input className="input__recover" placeholder="Email" name='recover' />
                <button type="submit" className="boton">Recuperar</button>
                </form>
            </RecoverContainer>
        
        </>
    )
}
const RecoverContainer = styled.div`
 width: 100%;
    height: 100vh;
    display:flex;
    justify-content: center;
    align-items:center;

    form{ position:relative;
    width: 450px;
    height: 600px;
    align-items:center;
    
    transition: all .2s ease;
    box-shadow: 3px 3px 20px ${({ theme }) => theme.secondary};
    border-radius: 15px;
    display:flex;
    flex-flow:column;
    border: 3px ${({ theme }) => theme.secondary} solid;
    justify-content: space-evenly;
    font-size:17px;
    margin-top: 160px;
}

    @media screen and (max-width: 500px) {
    width: 100%;
    form{ width:100%;
    border:none;
    box-shadow:none;
    margin:0;
    padding-top:100px;
    }
}


font-size:17px;
.input__recover{
    border: 1px solid ${({ theme }) => theme.border};
  font-size: 18px;
  padding: 7px;
  border-radius: 7px;
  margin-left:7px
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