import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import Form from "./Form";

const stripePromise = loadStripe(
  "pk_test_51M2JP4AgjktpBTilG9S2eTpvPaSbycKW1Mbga3HsPNe62g693fhNOpVCajAAh5XRvdgSQNrysJoKIHFyuBk48tik00fYkVRJlZ "
);

export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <Form />
    </Elements>
  );
}
