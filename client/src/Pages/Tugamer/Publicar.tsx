import { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../../components/Tugamer/Navbar";
import Validate, { formType, errType } from "../../components/validate";
import { symlink } from "fs";

import { createProduct } from "../../redux/actions";
import { useAppDispatch } from "../../app/hooks";

const Publicar = () => {
  const [loading, setLoading] = useState(false);
  const [previewSource, setPreviewSource] = useState('');
  
  const [err, setErr] = useState<errType>({
    name: "",
    price_local: "",
    stock: "",
    description: "",
    suspended: "",
    image: "",
  });

  const [input, setInput] = useState<formType>({
    name: "",
    price_local: -1,
    stock: -1,
    description: "",
    suspended: "",
    image: "",
    cloudinary: {},
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

      setInput({
      name: "",
      price_local: -1,
      stock: -1,
      description: "",
      suspended: "",
      image: "",
      cloudinary: {},
    });
  
    if (
      input.name === "" ||
      input.price_local === -1 ||
      input.stock === -1 ||
      err.price_local === "Tiene que ser un numero" ||
      input.description === "" ||
      input.suspended === ""
    ) {
      alert("Faltan datos");
    } else {
      alert("Producto agregado exitosamente!")
      dispatch(createProduct(input))
    }
  };



  const upLoadImage = async (e: any) => {
    console.log(e.target.files);
    e.preventDefault();
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "henryleo");   // imagenes/ es la carpeta de Cloudinary
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/minubeleo/image/upload",   //https://api.cloudinary.com/v1_1/:cloud_name/:action
      {
        method: "POST",
        body: data,
      }
    )
    const file = await res.json();
    setLoading(false);
    setInput({ ...input, [e.target.name]: file.secure_url })
    //console.log(file.secure_url);
  }
  return (
    <PublicarContainer>
      <Navbar />
      <AddProduct>
        <h1 className="addproduct-title">Add Product</h1>
        <form onSubmit={handleSubmit} action="" className="formularioproduct">
          <div className="productinfo">
            <div className="productinfo__left">
              <div className="inputinfo">
                <label htmlFor="">Nombre del producto:</label>
                <input name="name" type="text" onChange={handleChange} />
                {err.name ? <p className="errortext"> {err.name} </p> : ""}
              </div>
              <div className="inputinfo">
                <label htmlFor="price_local">Precio:</label>
                <input
                  name="price_local"
                  type="number"
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
                <input name="stock" type="number" onChange={handleChange} />
                {err.stock ? <p className="errortext"> {err.stock} </p> : ""}
              </div>
              <div className="inputinfo">
                <label htmlFor="description">Descripcion:</label>
                <textarea
                  name="description"
                  rows={5}
                  cols={33}
                  onChange={handleChange}
                />
                {err.description ? (
                  <p className="errortext"> {err.description} </p>
                ) : (
                  ""
                )}
              </div>
              <div className="inputinfo">
                <label htmlFor="suspended">Estado:</label>
                <select
                  defaultValue={"DEFAULT"}
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
                <input type="file" name="image" onChange={(e:any) =>upLoadImage(e)} />
              </div>

              {err.image ? <p className="errortext"> {err.image} </p> : ""}
            </div>
          </div>
          <button
            className="submitproduct"
          >
            Submit
          </button>

        </form>
      </AddProduct>
    </PublicarContainer>
  );
};

const PublicarContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
`;
const AddProduct = styled.div`
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

  .productinfo {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
  }

  .productinfo__left {
    width: 60%;
  }

  .errortext {
    font-size: 12px;
    color: ${({ theme }) => theme.error};
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
      resize: none;
      background-color: ${({ theme }) => theme.tertiary};
      border: none;
      border-radius: 4px;
      margin-bottom: 10px;
      padding: 10px;
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
