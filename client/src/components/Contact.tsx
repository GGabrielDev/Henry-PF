import styled from "styled-components";
import React, { useRef } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const ContactSectionStyle = styled.div`
  width: 100%;
  height: 500px;
  .form__content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .form__text {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .cuadrado {
    width: 800px;
    background-color: #f3f3f3;
    padding: 20px;
    border-radius: 20px;
  }

  .form__section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 300px;
    height: 300px;
    margin-right: 40px;
    input {
      padding: 7px;
      border-radius: 10px;
      width: 100%;
      border: 1px solid ${({ theme }) => theme.border};
    }
    span {
      width: 100%;
      text-align: start;
      margin: 10px 0;
    }

    textarea {
      border-radius: 10px;
      border: 1px solid ${({ theme }) => theme.border};
      resize: none;
      width: 100%;
      height: 200px;
      padding: 10px;
    }
  }

  .button__container {
    text-align: center;
    button {
      padding: 10px;
      border-radius: 10px;
      border: 1px solid transparent;
      transition: 0.4s;
      background-color: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.white};
      cursor: pointer;
      margin-bottom: 10px;
      &:hover {
        background-color: ${({ theme }) => theme.white};
        border: 1px solid ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.black};
      }
    }
  }

  .obligatorio {
    color: ${({ theme }) => theme.details};
    font-size: 12px;
    width: 100%;
    text-align: start;
  }
  @media screen and (max-width: 825px) {
    height: auto;

    .form__text {
      flex-direction: column;
    }
    .cuadrado {
      width: 90%;
      padding: 0;
      border-radius: 10px;
    }
    .form__content {
      margin-bottom: 20px;
    }
    .form__section {
      margin: 0;
      width: 90%;
      textarea: {
        width: 100%;
      }
      span {
        text-align: start;
      }
    }
  }
`;

export default function ContactSection() {
  const form = useRef<any>();

  const AlertaCorrecta = () => {
    Swal.fire({
      title: "Bien!",
      text: "Tu mensaje se envio a nuestro equipo!",
      icon: "success",
      confirmButtonText: "Ok!",
    });
  };

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_9lrw2q8",
      "template_taaexjm",
      form.current,
      "lXAeyoLMc8mPQLFnK"
    );
    e.target.reset();
    AlertaCorrecta();
  };

  const AlertaError = () => {
    Swal.fire({
      title: "Error!",
      text: "Control que todos los campos esten completos",
      icon: "error",
      confirmButtonText: "Ok!",
    });
  };

  return (
    <ContactSectionStyle>
      <div className="form__content">
        <form
          ref={form}
          className="cuadrado"
          onSubmit={(e: any) => {
            e.preventDefault();

            // datos del name
            e.target.name.value.length === 0 ||
            // datos del Mail
            e.target.email.value.length === 0 ||
            // datos del Numero
            e.target.tel.value.length === 0 ||
            e.target.tel.value < 0 ||
            // datos del Mensaje
            e.target.Message.value.length === 0
              ? AlertaError()
              : sendEmail(e);
          }}
        >
          <div className="form__text">
            <div className="form__section">
              <p className="obligatorio">Obligatorio(*)</p>
              <span>Nombre *</span>
              <input name="name" type="text" placeholder="Juan Carlos" />
              <span>Email *</span>
              <input
                type="email"
                name="email"
                placeholder="ejemplo@gmail.com"
              />
              <span>Telefono</span>
              <input name="tel" type="tel" placeholder="1231-2332-94325" />
            </div>
            <div className="form__section">
              <span>Mensaje *</span>
              <textarea name="Message" id=""></textarea>
            </div>
          </div>
          <div className="button__container">
            <button>Mandar Mensaje</button>
          </div>
        </form>
      </div>
    </ContactSectionStyle>
  );
}
