import { produceWithPatches } from "immer";
import React, {ReactElement} from "react";
import styled from "styled-components";
import { Themes } from "../Theme/Theme";

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
const AuthContainer= styled.div`
`