import Footer from "../assets/footer.svg";
import styled from "styled-components";
import { AiFillMail, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footerlanding = () => {
  return (
    <FooterlandingContainer className="footer-codemmerce">
      <div className="container-footer">
        <div className="row-footer">
          <div className="footer-col d-flex">
            <Link to="/">
              <div className="footer-codemmerce-img">
                <span className="logo">HenryShops</span>
              </div>
            </Link>
          </div>

          <div className="footer-col">
            <h4>Ayuda</h4>
            <ul>
              <li>
                <a href="#">Pagos</a>
              </li>
              <li>
                <a href="#">Cuentas</a>
              </li>
              <li>
                <a href="#">Hacer una solicitud</a>
              </li>
              <li>
                <a href="#">Status de solicitud</a>
              </li>
              <li>
                <a href="contact">Contactanos</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Nosotros</h4>
            <ul>
              <li>
                <a href=""> Quienes somos</a>
              </li>
              <li>
                <a href=""> Recompensas </a>
              </li>
              <li>
                <a href=""> Terminos y condiciones </a>
              </li>
              <li>
                <a href=""> Privacidad</a>
              </li>
              <li>
                <a href=""> Sugerencias </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Exclusivo</h4>
            <div className="form-sub">
              <form className="form-codemmerce">
                <input type="email" placeholder="e-mail" required />
                <button>Suscribirse</button>
              </form>
            </div>

            <div className="medias-socias">
              <a href="#">
                <i>
                  <BsDiscord />
                </i>
              </a>
              <a href="#">
                <i>
                  <AiFillMail />
                </i>
              </a>
              <a href="#">
                <i>
                  <AiFillLinkedin />
                </i>
              </a>
              <a href="#">
                <i>
                  <AiFillInstagram />
                </i>
              </a>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div className="footer-derechos">
        &copy; 2022 <b>HenryShops</b> - Todos los derechos reservados
      </div>
    </FooterlandingContainer>
  );
};

export default Footerlanding;

const FooterlandingContainer = styled.div`
  @import url(https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic);
  height: 300px;
  background-image: url(${Footer});
  background-size: cover;
  background-repeat: no-repeat;
  padding: 50px 0;
  padding-bottom: 25px;
  width: 100%;
  .footerCodemmerce {
    text-align: center;
  }
  h4 {
    font-weight: bold;
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.primary};
  }
  hr {
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary};
  }

  .container-footer {
    width: 100%;
    padding: 0 4%;
    margin: auto;
    background-color: ${({ theme }) => theme.primary};
  }
  .row-footer {
    display: flex;
    flex-wrap: wrap;
  }

  .d-flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-codemmerce {
    width: 100%;
  }

  .footer-col {
    width: 25%;
    padding: 0 15px;
    margin-bottom: 10px;
    background-color: ${({ theme }) => theme.primary};
  }

  .footer-codemmerce-img {
    width: 100%;
    .logo {
      width: 100%;
      color: ${({ theme }) => theme.white};
      transition: 0.4s;
      &:hover {
        color: ${({ theme }) => theme.secondary};
      }
    }
  }

  .footer-col ul {
    list-style: none;
    li {
      margin: 10px 0;
    }
    a {
      font-size: 16px;
      text-decoration: none;
      text-transform: capitalize;
      color: ${({ theme }) => theme.white};
      font-weight: 300;
      letter-spacing: 1px;
      display: block;
      transition: all 0.3s ease;
      &:hover {
        color: ${({ theme }) => theme.secondary};
        padding-left: 10px;
      }
    }
  }
  .footer-col .medias-socias {
    margin-top: 30px;
    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 40px;
      margin: 0 10px 10px 0;
      text-decoration: none;
      border-radius: 50%;
      color: ${({ theme }) => theme.white};
      border: 1px solid white;
      transition: all 0.5s ease;
      i {
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &:hover {
        color: ${({ theme }) => theme.primary};
        background-color: ${({ theme }) => theme.white};
      }
    }
  }

  .footer-col .form-sub input {
    width: 100%;
    padding: 10px;
    font-size: 15px;
    border: 1px solid ${({ theme }) => theme.black};
    border-radius: 5px;
    color: rgb(0, 0, 0);
    &::placeholder {
      color: ${({ theme }) => theme.black};
    }
  }

  .footer-col .form-sub button {
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    font-size: 17px;
    outline: none;
    border: 1px solid transparent;
    cursor: pointer;
    color: ${({ theme }) => theme.primary};
    border-radius: 5px;
    font-weight: bold;
    background-color: ${({ theme }) => theme.white};
    transition: 0.3s;
    &:hover {
      background: ${({ theme }) => theme.primary};
      border: 1px solid ${({ theme }) => theme.white};
      color: ${({ theme }) => theme.white};
    }
  }

  .footer-derechos {
    text-align: center;
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.primary};
  }
  @media (max-width: 1035px) {
    background-color: ${({ theme }) => theme.primary};
    .footer-col {
      width: 50%;
      margin-bottom: 30px;
    }
  }
  @media (max-width: 600px) {
    text-align: center;

    .footer-col {
      width: 100%;
      background-color: ${({ theme }) => theme.primary};
    }
  }
`;
