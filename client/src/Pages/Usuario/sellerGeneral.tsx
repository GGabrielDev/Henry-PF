import MenuUsuario from "./MenuUsuario";
import styled, { useTheme } from "styled-components";
import Perfil from "../../assets/imagenesSlider/profile.png";
import { ThemesLanding } from "../../components/ThemesLanding";
import { ThemeProvider } from "styled-components";
import { actions, selectors, SellerType } from "../../features/seller/sellerSlice";
import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";

const { selectSeller } = selectors;

const GeneralSeller = () => {
  const seller = useAppSelector(selectSeller) as SellerType;

  return (
    <GeneralContainer>
      <ThemeProvider theme={ThemesLanding}>
        <MenuUsuario />
        <GeneralContent>
          <h1 className="general__perfil-title">El perfil de tu Tienda</h1>
          <div className="general__info">
            <h3 className="general__perfil-section">La foto de tu Tienda:
            </h3>
            <div className="general__img">
              <div className="img__container">
                {seller.imageLogo ? (
                  <img
                    referrerPolicy="no-referrer"
                    src={seller.imageLogo}
                    alt="picture"
                  />
                ) : (
                  <img src={Perfil} alt="" />
                )}
              </div>
              <Link to="/usuario/editSeller">
                <button className="botones">Editar Tienda</button>
              </Link>
            </div>
            <h2 className="general__perfil-section">Información básica:</h2>

            <h3 className="general__perfil-section-item">URL</h3>
            <input
              readOnly
              type="text"
              className="general__input"
              value={
                seller.nombreUrl ? seller.nombreUrl : "No hay datos al momento"
              }
            />
            <h3 className="general__perfil-section-item">Nombre Negocio</h3>
            <input
            readOnly
              type="text"
              className="general__input"
              value={
                seller.nombreNegocio ? seller.nombreNegocio : "No hay datos al momento"
              }
            />
            <h3 className="general__perfil-section-item">Descripcion de tu tienda:</h3>
            <input
            readOnly
              type="text"
              className="general__input"
              value={
                seller.description ? seller.description : "No hay datos al momento"
              }
            />
            <h3 className="general__perfil-section-item">Template de tu tienda (Color)</h3>
            <input
            readOnly
              type="text"
              className="general__input"
              value={seller.template_page ? seller.template_page : "No hay datos al momento"}
            />
          </div>
        </GeneralContent>
      </ThemeProvider>
    </GeneralContainer>
  );
};

export default GeneralSeller;

const GeneralContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  @media screen and (max-width: 768px) {
    height: auto;
  }
`;

const GeneralContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 100px;
  border-left: 1px solid rgb(0, 0, 0, 0.1);

  .general__perfil-title {
    font-size: 20px;
  }

  .general__img {
    display: flex;
    align-items: center;
    justify-content: start;
    margin-top: 10px;
    width: 300px;
    height: fit-content;
  }

  .img__container {
    background-color: ${({ theme }) => theme.border};
    width: 150px;
    height: 150px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    img {
      width: 100%;
    }
  }

  .botones {
    height: 40px;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    flex-direction: column;
    margin-left: 20px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.primary};
    border: 1px solid ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.white};
    padding: 5px;
    cursor: pointer;
  }

  .subir__img {
    background-color: ${({ theme }) => theme.primary};
    border: 1px solid ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.light};
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    transition: 0.4s;
    &:hover {
      background-color: ${({ theme }) => theme.light};
      color: ${({ theme }) => theme.primary};
      border: 1px solid ${({ theme }) => theme.primary};
    }
  }

  .borrar__img {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.light};
    border-radius: 5px;
    padding: 5px;
    border: 1px solid ${({ theme }) => theme.border};
    cursor: pointer;
    transition: 0.4s;
    &:hover {
      background-color: ${({ theme }) => theme.light};
      color: ${({ theme }) => theme.primary};
      border: 1px solid ${({ theme }) => theme.primary};
    }
  }

  .general__perfil-section {
    font-size: 14px;
    font-weight: 400px;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .general__perfil-section-item {
    font-size: 12px;
    color: ${({ theme }) => theme.details};
    margin-top: 10px;
  }

  .general__input {
    padding: 5px;
    border-radius: 10px;
    width: 50%;
    font-size: 12px;
    color: ${({ theme }) => theme.primary};
    border: 1px solid ${({ theme }) => theme.border};
    margin-top: 5px;
  }

  @media screen and (max-width: 768px) {
    padding: 10px 10px;
    height: auto;
    .general__input {
      width: 100%;
    }
  }

  @media screen and (max-width: 576px) {
    .general__img {
      flex-direction: column;
      width: 100%;
    }
    .general__perfil-title {
      text-align: center;
    }
    .general__perfil-section {
      text-align: center;
    }
  }
`;