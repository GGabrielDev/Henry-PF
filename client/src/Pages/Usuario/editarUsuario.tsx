import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import NavbarLandingFuera from "../../components/NavbarLandingFuera";
import {
  getUserById,
  UserType,
  selectUser,
  editUser,
} from "../../features/users/userSlice";
import { AddProduct, PublicarContainer } from "../Tugamer/Publicar";
import { ThemesLanding } from "../../components/ThemesLanding";
import { ThemeProvider } from "styled-components";

export default function EditarUsuario() {
  const [user, setChange] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    imagenDePerfil: "",
    gender: null,
    address: "",
  });
  const dispatch = useAppDispatch();

  const detalleUsuario = useAppSelector(selectUser) as UserType;
  const { id } = detalleUsuario;
  useEffect(() => {
    console.log(detalleUsuario.id);
    if (detalleUsuario.id) {
      dispatch(getUserById(detalleUsuario.id));
    }
  }, [detalleUsuario.id]);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setChange({ ...user, [e.target.name]: e.target.value });
  };

  const upLoadImage = async (e: any) => {
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

    setChange({ ...user, [e.target.name]: file.secure_url });
  };

  return (
    <>
      <ThemeProvider theme={ThemesLanding}>
        <PublicarContainer>
          <NavbarLandingFuera />
          {detalleUsuario.id ? (
            <AddProduct>
              <h1 className="addproduct-title">Editar Tu Perfil</h1>
              <form className="formularioproduct">
                <div className="productinfo">
                  <div className="productinfo__left">
                    <div className="inputinfo">
                      <label htmlFor="firstName">Nombre:</label>
                      <input
                        name="firstName"
                        type="text"
                        placeholder={"" + detalleUsuario.firstName + ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="inputinfo">
                      <label htmlFor="lastName">Apellido:</label>
                      <input
                        className="price_local__input"
                        name="lastName"
                        type="text"
                        placeholder={"" + detalleUsuario.lastName + ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="inputinfo">
                      <label htmlFor="phonenumber">Numero de Telefono:</label>
                      <input
                        name="phoneNumber"
                        placeholder={"" + detalleUsuario.phoneNumber + ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="inputinfo">
                      <label htmlFor="address">Direccion:</label>
                      <input
                        name="address"
                        type="text"
                        placeholder={"" + detalleUsuario.address + ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="inputinfo ultimo__select">
                      <label htmlFor="gender">Genero:</label>
                      <select
                        defaultValue={"DEFAULT"}
                        name="gender"
                        id=""
                        onChange={handleChange}
                      >
                        <option value="DEFAULT" disabled>
                          Elige Uno
                        </option>
                        <option value="M"> Hombre </option>
                        <option value="F"> Mujer </option>
                        <option value="No binario"> No Binario </option>
                        <option value="Prefiero no decirlo">
                          {" "}
                          Prefiero no decirlo{" "}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="productinfo__Right">
                    <div className="imageupload">
                      <input
                        type="file"
                        name="imagenDePerfil"
                        onChange={(e) => upLoadImage(e)}
                        alt={"" + detalleUsuario.imagenDePerfil + ""}
                      />
                    </div>
                  </div>
                </div>
                <Link to="/usuario/general">
                  {detalleUsuario.id ? (
                    <button
                      className="submitproduct"
                      onClick={() => dispatch(editUser({ user, id }))}
                    >
                      Cambiar
                    </button>
                  ) : null}
                </Link>
              </form>
            </AddProduct>
          ) : (
            <></>
          )}
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
