import  {ReactElement} from "react";
import styled from "styled-components";


interface Props{
    children:ReactElement
}

export function AuthCard(props:Props){
    return(
        <AuthContainer>
          {props.children}
        </AuthContainer>
    )
}

const AuthContainer = styled.div`
display:flex;
    justify-content:center;
    align-items:center;
    position:relative;
`