import React, { useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { ThemesLanding } from "../../components/ThemesLanding";
import { ThemeProvider } from "styled-components";
import { Link } from "react-router-dom";
import imgtop2 from "../../assets/top2.jpg";
import { AiOutlineCheck } from "react-icons/ai";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import Navbarlanding from "./NavbarLanding";

const stripePromise = loadStripe(
  "pk_test_51LbWG6CISvGskgcJQ1tAlsYcaFsZYI2XridI8464CZNO17EXAUdRbehJsxs8VA3CUjRwz10bwuThVq8GtBLxFsN900VthEmx1m "
);

const CheckoutForm = () => {
  const form = useRef();
  const [loader, setLoader] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const AlertaError = () => {
      Swal.fire({
        title: "Error!",
        text: "Control que todos los campos esten completos",
        icon: "error",
        confirmButtonText: "Ok!",
      });
    };

    const TarjetaInvalida = (e) => {
      Swal.fire({
        title: "Error!",
        text: e,
        icon: "error",
        confirmButtonText: "Ok!",
      });
    };

    const AlertaCorrecta = () => {
      Swal.fire({
        title: "Tu pago se realizó correctamente",
        text: "Has recibido un mensaje en tu bandeja de email",
        icon: "success",
        confirmButtonText: "Continuar",
      });
    };
    if (
      e.target.name.value.length === 0 ||
      e.target.email.value.length === 0 ||
      e.target.celular.value.length === 0 ||
      e.target.celular.value < 0
    ) {
      AlertaError();
    } else {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      setLoader(true);

      if (!error) {
        const { id } = paymentMethod;

        try {
          const { data } = await axios.post(
            `http://localhost:3001/stripe/api/checkout`,
            {
              id,
              amount: 2700,
              description: "premium pack",
            }
          );

          if (data.message == "Succes") {
            emailjs.sendForm(
              "service_zeb79a1",
              "template_zdwmfkk",
              "#Myform",
              "lXAeyoLMc8mPQLFnK"
            );
            AlertaCorrecta();
          } else {
            TarjetaInvalida(data.message.decline_code);
          }
          e.target.reset();
        } catch (error) {
          console.log(error);
        }
        setLoader(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} id="Myform" className="formpaycard">
      <div className="checkout__nombre">
        <p className="nombre__checkout">Nombre Completo: </p>
        <input
          className="input__nombre__checkout"
          name="name"
          type="text"
          required
        />
        <p className="nombre__checkout">Email: </p>
        <input
          className="input__nombre__checkout"
          name="email"
          type="email"
          required
        />
        <p className="nombre__checkout">Celular: </p>
        <input
          className="input__nombre__checkout"
          name="celular"
          type="number"
          required
        />
      </div>
      <CardElement className="inputpay" />
      {loader ? (
        <button className="pago__boton" disabled>
          <span>Cargando...</span>
        </button>
      ) : (
        <button type="submit" className="pago__boton">
          <span>Comprar</span>
        </button>
      )}
    </form>
  );
};

export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <ThemeProvider theme={ThemesLanding}>
        <SectionPago>
          <Navbarlanding />
          <div className="formulario__pago">
            <div className="formcontent">
              <Link to="/">
                <h2 className="logo">Henry Shops</h2>
              </Link>
              <h3 className="logo">Checkout</h3>

              <CheckoutForm />
            </div>

            <div className="pagodate">
              <div className="cardsubcription cardblack">
                <div className="topsectioncadsub">
                  <div className="imgcontainercarsub">
                    <img src={imgtop2} alt="" />
                  </div>
                  <div className="divtitlecardsub">
                    <h3>Premium</h3>
                    <p>
                      $ <span>27</span>/Mes{" "}
                    </p>
                  </div>
                </div>
                <div className="detailsectioncardsub">
                  <div className="lineinfosub">
                    <AiOutlineCheck />
                    <div className="textlineinfo">
                      Crea hasta 20 categorias.
                    </div>
                  </div>
                  <div className="lineinfosub">
                    <AiOutlineCheck />
                    <div className="textlineinfo">
                      Agrega productos ilimitados
                    </div>
                  </div>
                  <div className="lineinfosub">
                    <AiOutlineCheck />
                    <div className="textlineinfo">Atencion 24/7 </div>
                  </div>

                  <div className="lineinfosub">
                    <AiOutlineCheck />
                    <div className="textlineinfo">
                      Hasta siete cuentas admin{" "}
                    </div>
                  </div>
                </div>
                <div className="">
                  <p className="totales">Subtotal: 21,33</p>
                  <p className="totales">Impuesto IVA: 5,67</p>
                  <p className="totales">Total: 27</p>
                </div>
              </div>
            </div>
          </div>
        </SectionPago>
      </ThemeProvider>
    </Elements>
  );
}

const SectionPago = styled.div`
  width: 100%;
  display: flex;
  height: 100vh;

  .formulario__pago {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo {
    color: ${({ theme }) => theme.primary};
  }

  .input__nombre__checkout {
    border: 1px solid ${({ theme }) => theme.border};
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    margin-bottom: 10px;
  }

  .checkout__nombre {
    width: 400px;
    margin-bottom: 10px;
    color: #5c5c5c;
  }

  .formcontent {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    h2 {
      text-align: center;
      font-size: 40px;
    }
    width: 50%;
    height: 100%;
    background-color: #ffffff;
  }
  .formpaycard {
    width: 400px;
  }
  .inputpay {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.border};
    margin-bottom: 10px;
  }

  .nombre__checkout {
    font-size: 14px;
  }

  .pagodate {
    width: 50%;
    height: 100%;
    background-color: ${({ theme }) => theme.primary};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pago__boton {
    border: 1px solid ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary};
    padding: 10px;
    color: ${({ theme }) => theme.light};
    transition: 0.4s;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      color: ${({ theme }) => theme.primary};
      background-color: ${({ theme }) => theme.light};
    }
  }

  .cardscontainersubs {
    width: 1050px;
    border: 1px solid ${({ theme }) => theme.border};
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .cardsubcription {
    border-radius: 10px;
    padding: 15px;
    display: flex;
    flex-direction: column;
  }

  .cardwhite {
    width: 320px;
    height: 340px;
  }

  .topsectioncadsub {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }

  .imgcontainercarsub {
    width: 80px;
    height: 80px;
    background-color: aquamarine;
    overflow: hidden;
    border-radius: 7px;

    img {
      width: 140px;
    }
  }

  .divtitlecardsub {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    padding: 0 20px;
    p {
      color: #5560ff;
      line-height: 25px;
      span {
        font-size: 35px;
        color: ${({ theme }) => theme.primary};
      }
    }
  }

  .detailsectioncardsub {
    width: 100%;
    padding: 10px;
  }

  .lineinfosub {
    display: flex;
    width: 100%;
    margin-bottom: 10px;

    svg {
      font-size: 25px;
    }
  }

  .textlineinfo {
    padding: 0 20px;
    color: #7e7e7e;
    text-align: start;

    font-size: 15px;
  }

  .buttoncardsub {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    button {
      width: 300px;
      height: 45px;
      border: none;
      color: white;
      font-weight: 700;
      background-color: ${({ theme }) => theme.primary};
      border-radius: 3px;
      cursor: pointer;
      transition: 0.3s;
    }

    button:hover {
      background-color: #004ab9;
    }
  }

  .cardblack {
    width: 350px;
    height: 390px;
    background-color: ${({ theme }) => theme.primary};

    h3 {
      color: white;
    }
    p {
      color: white;

      span {
        color: white;
      }
    }
    svg {
      color: white;
    }

    span {
      color: white;
    }

    .textlineinfo {
      color: white;
    }

    button {
      background-color: white;

      color: ${({ theme }) => theme.primary};
    }
    button:hover {
      background-color: #eeeeee;
    }
  }

  .totales {
    text-align: center;
    margin-bottom: 10px;
  }

  @media screen and (max-width: 420px) {
    padding: 0;
    .cardsubcription {
      width: 100%;
      margin-bottom: 0px;
      border-radius: 0px;
    }

    .buttoncardsub {
      button {
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 952px) {
    height: 100vh;
    .formpaycard {
      width: 500px;
    }

    .checkout__nombre {
      width: 500px;
    }

    .formulario__pago {
      height: 100%;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .formcontent {
      width: 500px;
    }

    .pagodate {
      width: 100%;
    }
  }

  @media screen and (max-width: 602px) {
    .formpaycard {
      width: 90%;
    }

    .checkout__nombre {
      width: 90%;
    }

    .formcontent {
      width: 90%;
    }
  }
`;
