import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Navbarlanding from "../../components/Navbarlanding";
import {
  getSellerById,
  SellerType,
  selectors as sellerSelectors,
  editSeller,
} from "../../features/seller/sellerSlice";
import { AddProduct, PublicarContainer } from "../Tugamer/Publicar";
import {
  selectors as userSelectors,
  actions as userActions,
  getUserByEmail,
  UserType,
} from "../../features/users/userSlice";
import { ThemeProvider } from "styled-components";
import { ThemesLanding } from "../../components/ThemesLanding";

const { selectSeller } = sellerSelectors;
const { selectUser } = userSelectors;

export default function EditarSeller() {
  const [seller, setChange] = useState<Partial<SellerType>>({
    nombreNegocio: "",
    paymentId: "",
    template_page: "1",
    description: "",
  });
  const dispatch = useAppDispatch();
  const detalleUsuario = useAppSelector(selectUser) as UserType;
  const detalleSeller = useAppSelector(selectSeller) as SellerType;
  const { id } = detalleSeller;
  useEffect(() => {
    if (!detalleSeller.id) {
      dispatch(getSellerById(detalleUsuario.sellerId as string));
    }
  }, [detalleSeller.id]);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setChange({ ...seller, [e.target.name]: e.target.value });
  };

  const upLoadImageLogo = async (e: any) => {
    e.preventDefault();

    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "henryleo"); // imagenes/ es la carpeta de Cloudinary

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/minubeleo/image/upload", //https://api.cloudinary.com/v1_1/:cloud_name/:action
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    setChange({ ...seller, [e.target.name]: file.secure_url });
  };

  return (
    <>
      <ThemeProvider theme={ThemesLanding}>
        <PublicarContainer>
          <Navbarlanding />
          <AddProduct>
            <h1 className="addproduct-title">Editar Informacion de Vendedor</h1>
            <form className="formularioproduct">
              <div className="productinfo">
                <div className="productinfo__left">
                  <div className="inputinfo">
                    <label htmlFor="nombreNegocio">Nombre de la tienda:</label>
                    <input
                      className="price_local__input"
                      name="nombreNegocio"
                      type="text"
                      placeholder={"" + detalleSeller.nombreNegocio + ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="inputinfo">
                    <label htmlFor="description">
                      Escriba algo de su tienda para que figure en la pagina:
                    </label>
                    <textarea
                      name="phoneNumber"
                      placeholder={"" + detalleSeller.description + ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="inputinfo ultimo__select">
                    <label htmlFor="template_page">
                      Template de pagina(Cambio de color):
                    </label>
                    <select
                      defaultValue="1"
                      name="template_page"
                      id=""
                      onChange={handleChange}
                    >
                      <option value="3">Elige Uno</option>
                      <option value="1"> Naranja Amarillento </option>
                      <option value="2"> Rojo Rosa </option>
                      <option value="3"> Azul </option>
                    </select>
                  </div>
                  <div className="inputinfo ultimo__select">
                    <label htmlFor="categorias">
                      Categoria a la que pertence su tienda:
                    </label>
                    <select
                      defaultValue="No esta especificado"
                      name="categorias"
                      id=""
                      onChange={handleChange}
                    >
                      <option value="null" disabled>
                        Elige Uno
                      </option>
                      <option value="Educacion"> Educacion </option>
                      <option value="Vestimenta"> Vestimenta </option>
                      <option value="Tecnologia"> Tecnologia </option>
                      <option value="Servicios"> Servicios </option>
                      <option value="Entretenimiento"> Entretenimiento </option>
                      <option value="Gastronomia"> Gastronomia </option>
                      <option value="No esta especificado">
                        {" "}
                        No esta especificado{" "}
                      </option>
                    </select>
                  </div>
                </div>
                <div className="productinfo__Right">
                  <div className="imageupload">
                    <input
                      type="file"
                      name="imagenDePerfil"
                      onChange={(e) => upLoadImageLogo(e)}
                      alt={"" + detalleSeller.imageLogo + ""}
                    />
                  </div>
                </div>
              </div>
              <Link to="/usuario/sellerGeneral">
                <button
                  className="submitproduct"
                  onClick={() =>
                    dispatch(
                      editSeller({ seller, id } as {
                        seller: Partial<SellerType>;
                        id: string;
                      })
                    )
                  }
                >
                  Cambiar
                </button>
              </Link>
            </form>
          </AddProduct>
        </PublicarContainer>
      </ThemeProvider>
    </>
  );
}

const FormEdit = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  border: 1px solid red;
  width: 600px;
  height: 800px;
  align-content: center;
`;
