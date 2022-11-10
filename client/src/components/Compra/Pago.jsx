import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51LbWG6CISvGskgcJQ1tAlsYcaFsZYI2XridI8464CZNO17EXAUdRbehJsxs8VA3CUjRwz10bwuThVq8GtBLxFsN900VthEmx1m "
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;

      try {
        const { data } = await axios.post(
          `http://localhost:3001/stripe/api/checkout`,
          {
            id,
            amount: 1000000,
          }
        );

        console.log(data);
      } catch (error) {
        console.log(error)
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="formpaycard">
      <CardElement className="inputpay" />
      <button type="submit">Pagar</button>
    </form>
  );
};

export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <SectionPago>
        <div className="formcontent">
          <h2>Ingresa la tarjeta</h2>
          <CheckoutForm />
        </div>

        <div className="pagodate"></div>
      </SectionPago>
    </Elements>
  );
}

const SectionPago = styled.div`
  width: 100%;
  display: flex;

  .formcontent {
    display: flex;
    align-items: center;
    flex-direction: column;
    h2 {
      text-align: center;
      font-size: 40px;
    }
    width: 50%;
    height: 700px;
    background-color: #ffffff;
  }
  .formpaycard {
    width: 400px;
  }
  .inputpay {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid black;
  }

  .pagodate {
    width: 50%;
    height: 700px;
    background-color: red;
  }
`;
