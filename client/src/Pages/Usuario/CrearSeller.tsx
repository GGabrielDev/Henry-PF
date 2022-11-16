import { useState, ChangeEvent, SyntheticEvent } from "react";
import styled from "styled-components";
import Navbar from "../../components/Tugamer/Navbar";
import ValidateSeller from "../../helpers/validateseller";

import Swal from "sweetalert2";
import { createSeller } from "../../features/seller/sellerSlice";
import { useAppDispatch } from "../../app/hooks";
import {
  InputStateSeller,
  ErrorStateSeller,
  upLoadImageSeller,
} from "../../helpers/Cloudinary";

const CreateSeller = () => {
  const [loading, setLoading] = useState(false);

  const AlertaCorrecta = () => {
    Swal.fire({
      title: "Tienda Creada!",
      text: "Se ha convertido en un vendedor de manera exitosa",
      icon: "success",
      confirmButtonText: "Perfecto",
    });
  };
  // ALERTA PARA CUANDO FALTAN DATOS

  const AlertaIncorrecta = () => {
    Swal.fire({
      title: "Error",
      text: "Faltan datos",
      icon: "error",
      confirmButtonText: "Ok!",
    });
  };

  const [err, setErr] = useState<ErrorStateSeller>({
    nombreUrl: "",
    nombreNegocio: "",
    imageLogo: "",
    categorias: "",
    template_page: "",
    description: "",
  });

  const [input, setInput] = useState<InputStateSeller>({
    nombreUrl: "",
    nombreNegocio: "",
    imageLogo: "",
    categorias: "No esta especificado",
    template_page: null,
    description: "",
    paymentId: "",
  });

  const dispatch = useAppDispatch();

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setInput({ ...input, [event.target.name]: event.target.value });
    setErr(
      ValidateSeller({ ...input, [event.target.name]: event.target.value })
    );
  };

  const handleSubmit = (event: SyntheticEvent) => {
    setErr(ValidateSeller(input));
    event.preventDefault();
    setInput({
      nombreUrl: "",
      nombreNegocio: "",
      imageLogo: "",
      template_page: null,
      description: "",
      categorias: "No esta especificado",
      paymentId: "",
    });

    if (
      input.nombreUrl === "" ||
      input.nombreNegocio === "" ||
      input.imageLogo === "" ||
      input.template_page === null ||
      input.description === "" ||
      input.categorias === "No esta especificado"
      //   ) {
      //     alert("Faltan agregar datos");
      //   } else {
      //     alert("Producto agregado exitosamente!");
      //     dispatch(createProduct(input));
      //   }
      // };
    ) {
      AlertaIncorrecta();
    } else {
      AlertaCorrecta();
      // event.target.reset()
      // document.getElementById("form-public").reset();
      dispatch(createSeller(input));
    }
  };
  return (
    <PublicarContainer>
      <Navbar />
      <AddProduct>
        <h1 className="addproduct-title">Crea tu pagina</h1>
        <form
          onSubmit={handleSubmit}
          action=""
          id="form-public"
          className="formularioproduct"
        >
          <div className="productinfo">
            <div className="productinfo__left">
              <h5 className="campo__obligatorio">
                Todos los campos son obligatorios
              </h5>
              <div className="inputinfo">
                <label htmlFor="">Url del negocio:</label>
                <input
                  value={"" + input.nombreUrl + ""}
                  name="nombreUrl"
                  type="text"
                  onChange={handleChange}
                />
                {err.nombreUrl ? (
                  <p className="errortext"> {err.nombreUrl} </p>
                ) : (
                  ""
                )}
              </div>
              <div className="inputinfo">
                <label htmlFor="">Nombre del producto:</label>
                <input
                  value={"" + input.nombreNegocio + ""}
                  name="nombreNegocio"
                  type="text"
                  onChange={handleChange}
                />
                {err.nombreNegocio ? (
                  <p className="errortext"> {err.nombreNegocio} </p>
                ) : (
                  ""
                )}
              </div>
              {/*<div className="inputinfo">
                <label htmlFor="">Categoria:</label>
                <input name="categories" type="text" onChange={handleChange} />
                </div>*/}
              <div className="productinfo__Right">
                <div className="imageupload">
                  <input
                    type="file"
                    name="imageLogo"
                    onChange={upLoadImageSeller(
                      input,
                      setLoading,
                      setInput,
                      setErr
                    )}
                  />
                </div>
                {err.imageLogo ? (
                  <p className="errortext"> {err.imageLogo} </p>
                ) : (
                  ""
                )}
              </div>
              <div className="inputinfo ultimo__select">
                <label htmlFor="template_page">
                  Seleccione el template de su pagina:
                </label>
                <select
                  value={"" + input.template_page + ""}
                  name="suspended"
                  id=""
                  onChange={handleChange}
                >
                  <option value="null" disabled>
                    Elige Uno
                  </option>
                  <option value="1">Rojo</option>
                  <option value="2">Verde</option>
                  <option value="3">Azul</option>
                </select>
                {err.template_page ? (
                  <p className="errortext"> {err.template_page} </p>
                ) : (
                  ""
                )}
              </div>

              <div className="inputinfo">
                <label htmlFor="description">Descripcion de su tienda:</label>
                <input
                  value={"" + input.description + ""}
                  name="description"
                  type="text"
                  onChange={handleChange}
                />
                {err.description ? (
                  <p className="errortext"> {err.description} </p>
                ) : (
                  ""
                )}
              </div>

              <div className="inputinfo ultimo__select">
                <label htmlFor="categorias">
                  A que categoria pertenece su tienda:
                </label>
                <select
                  value={"" + input.categorias + ""}
                  name="suspended"
                  id=""
                  onChange={handleChange}
                >
                  <option value="null" disabled>
                    Elige Uno
                  </option>
                  <option value="Gastronomia">Gastronomia</option>
                  <option value="Entretenimiento">Entretenimiento</option>
                  <option value="servicios">Servicios</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="Vestimenta">Vestimenta</option>
                  <option value="Educacion">Educación</option>
                  <option value="No esta especificado">
                    No esta especificado
                  </option>
                </select>
                {err.categorias ? (
                  <p className="errortext"> {err.categorias} </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <button className="submitproduct">Submit</button>
        </form>
      </AddProduct>
    </PublicarContainer>
  );
};

export const PublicarContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
`;
export const AddProduct = styled.div`
  width: 100%;
  padding-top: 131px;

  .addproduct-title {
    text-align: center;
    color: ${({ theme }) => theme.primary};
    margin-bottom: 20px;
  }
  .formularioproduct {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .campo__obligatorio {
    color: ${({ theme }) => theme.details};
    margin-bottom: 5px;
  }

  .productinfo {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
  }

  .productinfo__left {
    width: 60%;
  }

  .price_local__input {
    text-transform: uppercase;
  }

  .errortext {
    font-size: 12px;
    color: ${({ theme }) => theme.error};
    margin-bottom: 5px;
  }

  .inputinfo {
    display: flex;
    flex-direction: column;
    height: 85px;
    margin-bottom: 10px;

    label {
      font-weight: 600;
      font-size: 20px;
      color: ${({ theme }) => theme.primary};
    }

    input {
      width: 500px;
      height: 40px;
      padding: 10px;
      background-color: ${({ theme }) => theme.tertiary};
      border: none;
      border-radius: 4px;
    }

    textarea {
      width: 500px;
      min-height: 55px;
      resize: none;
      background-color: ${({ theme }) => theme.tertiary};
      border: none;
      border-radius: 4px;
      margin-bottom: 3px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    select {
      width: 500px;
      resize: none;
      background-color: ${({ theme }) => theme.tertiary};
      border: none;
      border-radius: 4px;
      margin-bottom: 10px;
    }
  }

  .ultimo__select {
    margin-top: 20px;
  }

  .productinfo__Right {
    width: 40%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .imageupload {
    width: 270px;
    height: 270px;
    background-color: ${({ theme }) => theme.tertiary};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;

    input {
      width: 230px;
    }
  }

  .submitproduct {
    width: 150px;
    background-color: ${({ theme }) => theme.primary};
    border: none;
    padding: 10px;
    font-weight: 0;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    transition: 0.3s;
  }

  .submitproduct:hover {
    background-color: #3479c9;
  }

  @media screen and (max-width: 1100px) {
    .productinfo {
      flex-direction: column-reverse;
      height: auto;
    }

    .productinfo__Right {
      width: 100%;
      margin-bottom: 20px;
    }
    .productinfo__left {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .formularioproduct {
      padding: 0;
    }
  }

  @media screen and (max-width: 550px) {
    .productinfo__left {
      padding: 0px 20px;
      input {
        width: 100%;
      }
      textarea {
        width: 100%;
      }
    }

    .inputinfo {
      width: 100%;
    }
  }
`;

export default CreateSeller;

