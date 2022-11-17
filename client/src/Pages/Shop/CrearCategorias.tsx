import { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { createCategory } from "../../features/products/productSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { InputStateCategories, ErrorStateCategories } from "../../helpers/Cloudinary";
import ValidateCategories from "../../helpers/validateCategories";
import {getSellerById, SellerType, selectors as sellerSelectors, editSeller } from "../../features/seller/sellerSlice";
import { selectors as userSelectors, actions as userActions, getUserByEmail, UserType} from "../../features/users/userSlice";
import { getProductsSeller, selectProducts } from "../../features/products/productSlice";

const { selectSeller } = sellerSelectors;
const { selectUser } = userSelectors;



const CrearCategorias = () => {
  const [loading, setLoading] = useState(false);
  const [previewSource, setPreviewSource] = useState("");
 
  const seller = useAppSelector(selectSeller)
  const products = useAppSelector(selectProducts);
  const { id }  = seller

  const AlertaCorrecta = () => {
    Swal.fire({
      title: "Categoria creada",
      text: "Se ha creado una nueva categoria de manera exitosa",
      icon: "success",
      confirmButtonText: "Perfecto",
    });
  };
  // ALERTA PARA CUANDO FALTAN DATOS

  const AlertaIncorrecta = () => {
    Swal.fire({
      title: "Error",
      text: "Faltan datos o la categoria ya esta creada!",
      icon: "error",
      confirmButtonText: "Ok!",
    });
  };

  const [err, setErr] = useState<ErrorStateCategories>({
    name: "",
  });

  const [category, setCategory] = useState<InputStateCategories>({
    name: ""
  });

  const dispatch = useAppDispatch();

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setCategory({ ...category, [event.target.name]: event.target.value });
    setErr(ValidateCategories({ ...category, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: SyntheticEvent) => {
    setErr(ValidateCategories(category));
    event.preventDefault();
    setCategory({
      name: "",
    });

    if (
      category.name === ""
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
      if(id){dispatch(
        createCategory({category, id}))} else {
          console.log("Id no existe")
        }
      
    }
  };
  return (
    <PublicarContainer>
      <AddProduct>
        <h1 className="addproduct-title">Agrega una o mas Categorias</h1>
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
                <label htmlFor="">Nombre de la Categoria para tus productos a crear:</label>
                <select name="name" onChange={handleChange}>
                  <option value="{category.name}"></option>
                  {products.map(item => {
                    return (
                      <option value={item.name}>{item.name}</option>
                    )
                  })}
                  
                  
                 
                </select>
                {err.name ? <p className="errortext"> {err.name} </p> : ""}
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
      background-color: ${({ theme }) => theme.gray};
      border: none;
      border-radius: 4px;
    }

    textarea {
      width: 500px;
      min-height: 55px;
      resize: none;
      background-color: ${({ theme }) => theme.gray};
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
      background-color: ${({ theme }) => theme.gray};
      border: none;
      border-radius: 4px;
      margin-bottom: 10px;
      height: 40px;
      padding: 10px;
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
    background-color: ${({ theme }) => theme.gray};
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
      select {
        width: 100%;
      }
    }

    .inputinfo {
      width: 100%;
    }
  }
`;

export default CrearCategorias;