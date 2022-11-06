import styled from "styled-components";
import Imagen3 from "../../assets/imagenesSlider/hamburguesas.jpg";
import vendedor from "../../assets/imagenesSlider/vendedor.jpg";
import { Logo } from "../../components/Tugamer/Navbar";
import { ThemesLanding } from "../../components/ThemesLanding";
import { ThemeProvider } from "styled-components";

const General = () => {
  return (
    <GeneralContainer>
      <ThemeProvider theme={ThemesLanding}>
        <h1 className="general__perfil-title">Detalle</h1>
        <h2 className="section">Vendedor</h2>
        <div className="detail__card">
          <div className="card__section1">
            <div className="detail__img__container">
              <img className="detail__img" src={vendedor} alt="" />
            </div>
            <h1 className="detail-product">Andrés hamburguesas</h1>
          </div>
          <Logo>PedirYa</Logo>
        </div>

        <h2 className="section">Compra</h2>

        <div className="detail__card">
          <div className="card__section1">
            <div className="detail__img__container-product">
              <img className="detail__img" src={Imagen3} alt="" />
            </div>
            <div className="detail-product-container">
              <p className="detail-product-item-n">1</p>
              <div className="detail-products">
                <p className="detail-product-item">
                  Hamburguesa colombiana con extra queso
                </p>
                <p className="detail-product-item">
                  Papas con cheddar ESPECIAL
                </p>
                <p className="detail-product-item">Agua mineral</p>
                <p className="detail-product-item">Helado de 1kg</p>
              </div>
            </div>
          </div>
          <div className="detail__img__container-product">
            <h1 className="detail__price">$70USD</h1>
          </div>
        </div>

        <h2 className="section">Resumen</h2>

        <div className="detail__card">
          <div className="card__resumen">
            <div className="card__resumen-item">
              <p className="detail-product">Subtotal</p>
              <p className="detail__value">$70USD</p>
            </div>
            <div className="card__resumen-item">
              <p className="detail-product">Envio</p>
              <p className="detail__value">$9.99USD</p>
            </div>
            <div className="card__resumen-item">
              <p className="detail-product">Descuentos</p>
              <p className="detail__value">9.99USD</p>
            </div>
            <div className="card__resumen-item">
              <p className="detail-product">TOTAL</p>
              <p className="detail__value">70USD</p>
            </div>
          </div>
        </div>

        <h2 className="section">Metodo de pago: </h2>

        <div className="detail__card">
          <div className="card__resumen">
            <div className="card__resumen-item">
              <p className="detail-product">VISA</p>
              <p className="detail__value">****4040</p>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </GeneralContainer>
  );
};

export default General;

const GeneralContainer = styled.div`
  height: 100vh;
  width: 100%;
  text-align: center;
  padding: 20px;

  .general__perfil-title {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    margin-bottom: 10px;
  }

  .section {
    color: ${({ theme }) => theme.primary};
    text-align: start;
    font-size: 15px;
    margin-bottom: 10px;
  }

  .card__section1 {
    display: flex;
    align-items: center;
  }

  .detail-product {
    font-size: 15px;
    color: ${({ theme }) => theme.primary};
    width: 150px;
    padding: 5px;
    text-align: start;
  }

  .detail__card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.cream2};
    border: 1px solid ${({ theme }) => theme.border};
    width: 100%;
    border-radius: 15px;
    margin-bottom: 10px;
  }

  .detail__img__container {
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .detail__img {
    width: 100%;
  }

  .detail__pedido {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .detail__img__container-product {
    width: 70px;
  }

  .detail-product-container {
    display: flex;
    align-items: center;
  }

  .detail-products {
    margin-left: 10px;
  }

  .detail-product-item {
    font-size: 11px;
    text-align: start;
    margin-bottom: 7px;
    color: ${({ theme }) => theme.dark};
  }

  .detail-product-item-n {
    margin: 0 5px;
    display: flex;
    align-items: start;
    font-size: 10px;
  }

  .detail__price {
    font-size: 15px;
    color: ${({ theme }) => theme.details};
  }

  .card__resumen {
    width: 100%;
  }

  .card__resumen-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .detail__value {
    font-size: 13px;
    padding: 5px;
  }

  @media screen and (max-width: 768px) {
    height: auto;
  }

  @media screen and (max-width: 576px) {
    .detail__card {
      flex-direction: column;
    }

    .card__section1 {
      flex-direction: column;
    }

    .detail-product {
      width: 100%;
    }

    .detail-product-container {
      flex-direction: column;
    }

    .detail-products {
      margin: 0;
    }
  }
`;
