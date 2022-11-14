import { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../../components/Tugamer/Navbar";
import Validate from "../../helpers/validate";
import { symlink } from "fs";
import Swal from "sweetalert2";
import { createProduct } from "../../redux/actions";
import { useAppDispatch } from "../../app/hooks";
import { InputState, ErrorState, upLoadImage } from "../../helpers/Cloudinary";

const Publicar = () => {
  const [loading, setLoading] = useState(false);
  const [previewSource, setPreviewSource] = useState("");

  const AlertaCorrecta = () => {
    Swal.fire({
      title: "Producto creado",
      text: "Se ha creado un producto de manera exitosa",
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

  const [err, setErr] = useState<ErrorState>({
    name: "",
    price_local: "",
    stock: "",
    description: "",
    suspended: "",
    image: "Si no se agrega imagen, se pondra una por default",
  });

  const [input, setInput] = useState<InputState>({
    name: "",
    price_local: 0,
    stock: 0,
    description: "",
    suspended: "DEFAULT",
    image: "https://definicion.de/wp-content/uploads/2009/06/producto.png",
    cloudinary: {},
    categories: [],
  });

  const dispatch = useAppDispatch();

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setInput({ ...input, [event.target.name]: event.target.value });
    setErr(Validate({ ...input, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: SyntheticEvent) => {
    setErr(Validate(input));
    event.preventDefault();
    setInput({
      name: "",
      price_local: -1,
      stock: -1,
      description: "",
      suspended: "DEFAULT",
      image: "",
      cloudinary: {},
      categories: [],
    });

    if (
      input.name === "" ||
      input.price_local === -1 ||
      input.stock === -1 ||
      err.price_local === "Tiene que ser un numero" ||
      input.description === "" ||
      input.suspended === "DEFAULT"
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
      dispatch(createProduct(input));
    }
  };
  return (
    <PublicarContainer>
      <Navbar />
      <AddProduct>
        <h1 className="addproduct-title">Agrega un producto</h1>
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
                <label htmlFor="">Nombre del producto:</label>
                <input
                  value={input.name}
                  name="name"
                  type="text"
                  onChange={handleChange}
                />
                {err.name ? <p className="errortext"> {err.name} </p> : ""}
              </div>
              {/*<div className="inputinfo">
                <label htmlFor="">Categoria:</label>
                <input name="categories" type="text" onChange={handleChange} />
                </div>*/}
              <div className="inputinfo">
                <label htmlFor="price_local">Precio:</label>
                <input
                  className="price_local__input"
                  value={input.price_local}
                  name="price_local"
                  type="text"
                  onChange={handleChange}
                />
                {err.price_local ? (
                  <p className="errortext"> {err.price_local} </p>
                ) : (
                  ""
                )}
              </div>
              <div className="inputinfo">
                <label htmlFor="stock">Stock:</label>
                <input
                  value={input.stock}
                  name="stock"
                  type="text"
                  onChange={handleChange}
                />
                {err.stock ? <p className="errortext"> {err.stock} </p> : ""}
              </div>
              <div className="inputinfo">
                <label htmlFor="description">Descripcion:</label>
                <textarea
                  value={input.description}
                  name="description"
                  onChange={handleChange}
                />
                {err.description ? (
                  <p className="errortext"> {err.description} </p>
                ) : (
                  ""
                )}
              </div>
              <div className="inputinfo ultimo__select">
                <label htmlFor="suspended">Estado:</label>
                <select
                  value={input.suspended}
                  name="suspended"
                  id=""
                  onChange={handleChange}
                >
                  <option value="DEFAULT" disabled>
                    Elige Uno
                  </option>
                  <option value="false">Activo</option>
                  <option value="true">Suspendido</option>
                </select>
                {err.suspended ? (
                  <p className="errortext"> {err.suspended} </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="productinfo__Right">
              <div className="imageupload">
                <input
                  type="file"
                  name="image"
                  onChange={upLoadImage(input, setLoading, setInput, setErr)}
                />
              </div>

              {err.image ? <p className="errortext"> {err.image} </p> : ""}
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
      background-color: ${({ theme }) => theme.gray};
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

export default Publicar;
