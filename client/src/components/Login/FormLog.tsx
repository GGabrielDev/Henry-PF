import { Logo } from "../Navbar";
import { AuthCard } from "./AuthCard";
import {Link} from 'react-router-dom';
import React, { useContext } from "react";
import { AuthContext } from "./Auth";
import styled from "styled-components";

export default function FormLog(){
    const {dispatchUser}:any = useContext(AuthContext)
    const handleSubmit= ()=>{

    }
    const handleChange= ( e: React.ChangeEvent<HTMLFormElement | HTMLInputElement>)=>{

    }

    return(
        
    <AuthCard>
    
    <form onSubmit={handleSubmit} autoComplete="off">
      <FormContainer>
        <div>
          <Logo>PedirYa</Logo>
        </div>

        <EmailInput>
          <div className="mx-2 mt-1"> 
            
          </div>
          <input
            autoFocus
            className="input__email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={ e => handleChange(e) }
          />
        </EmailInput>

        <PasswordInput>
          <div className="mx-2 mt-1"> 
           
          </div>
          <input
            className="input__pass"
            name="password"
            type="password"
            placeholder="Password"
            onChange={ e => handleChange(e) }
          />
        </PasswordInput>

        <RememberCheck>
            <div className="">
              <input
                type="checkbox"
                id="mycheckbox"
                className="checkbox__rem"
              /></div>
              <div>
              <label className="remember" htmlFor="mycheckbox">
                Remember
              </label>
             </div>
        </RememberCheck>
        <ButtonLogin>
          <button type="submit" className="btn__primary">
            Sign In
          </button>
        </ButtonLogin>

        <ForgotPass>
          <Link to="/auth/recover">Forgot Password?</Link>
        </ForgotPass>

        <RegisterDiv>
           <h5>Don't have an account?</h5>
          <Link to="/auth/register">Register</Link>
        </RegisterDiv>
        </FormContainer>
      </form>
      
        </AuthCard>
    )
}

const FormContainer = styled.div`
  width: 450px;
  height: 600px;
  position: relative;
  transition: all .2s ease;
  box-shadow: 3px 3px 20px ${({ theme }) => theme.secondary};
  border-radius: 15px;
  display:flex;
  flex-flow:column;
  border: 1px ${({ theme }) => theme.secondary} solid;
  justify-content: space-evenly;
  align-items:center;
  margin-top:160px;
  font-size:17px;
  
@media screen and (max-width: 500px) {
  
}
`;
export const EmailInput = styled.div`
.input__email{
  border:none;
  font-size: 18px
}

`;
export const PasswordInput = styled.div`
.input__pass{
  border:none;
  font-size: 18px
}
`;
const ButtonLogin = styled.div`
.btn__primary{
  font-size: 18px;
  border:none;
  border-radius:5px;
  cursor:pointer;
  width:140px;
  height:50px;
  background-color:${({ theme }) => theme.primary};
}


`
const ForgotPass = styled.div`
  font-size: 20px
`
const RegisterDiv = styled.div`
    display:flex;
    flex-flow:column;
    font-size: 20px;
    align-items:center;
    justify-content:space-between
`
const RememberCheck = styled.div`
display: flex;
font-size:18px;

width: 130px;
justify-content: space-between;
cursor:pointer;
.remember{
  margin-left:5px;
  cursor:pointer;
}
.checkbox__rem{
  margin-left:5px;
  cursor:pointer;
}
`