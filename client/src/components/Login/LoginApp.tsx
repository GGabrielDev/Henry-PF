import React, {useReducer} from "react";
import styled from "styled-components";
import { Themes } from "../Theme/Theme";


import { AuthContext } from "./Auth";
import { reducers } from "../../redux/reducer";

const init = ()=>{
  let sessionUser:any = sessionStorage.getItem('user');
  let user:any;
  if(!sessionUser){
    user=sessionUser;
  }else{
    user= JSON.parse(sessionUser)
  }
}

export default function Login(){
    const [user, dispatchUser]=useReducer(reducers, {}, init)
    
    

    return(
        <LoginContainer>
          <AuthContext.Provider value={{user, dispatchUser}}>
            
          </AuthContext.Provider>
        </LoginContainer>
    )
}

const LoginContainer=styled.div`


`