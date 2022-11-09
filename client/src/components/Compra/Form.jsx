import React from "react";
import Styled from "styled-components";
import { Elements, CardElement } from "@stripe/react-stripe-js";

const FormContainer = Styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
form {
  width: 600px;
  height:500px;
  border: 1px solid ${({ theme }) => theme.border}
}

`;

const Form = () => {
  return (
    <FormContainer>
      <form action="">
        <CardElement />
      </form>
    </FormContainer>
  );
};

export default Form;
