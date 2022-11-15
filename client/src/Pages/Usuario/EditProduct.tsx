import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Navbarlanding from "../../components/Navbarlanding";
import Navbar from "../../components/Tugamer/Navbar";
import {
  detailProduct,
  getProductId,
  ProductType,
} from "../../features/products/productSlice";
import { productEdit } from "../../redux/actions.js";
import { AddProduct, PublicarContainer } from "../Tugamer/Publicar";
import { uploadToCloudinary } from "../../helpers/Cloudinary";

export default function EditProduct() {
  const { productId } = useParams<{ productId?: string | undefined }>();
  const [change, setChange] = useState({
    name: "",
    price_local: -1,
    stock: -1,
    description: "",
    suspended: "",
    image: "",
  });
  const dispatch = useAppDispatch();

  const detalle = useAppSelector(detailProduct) as ProductType;
  useEffect(() => {
    console.log(productId);
    dispatch(getProductId(productId));
  }, [productId]);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setChange({ ...change, [e.target.name]: e.target.value });
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

    setChange({ ...change, [e.target.name]: file.secure_url });
  };
  return (
    <>
      <PublicarContainer>
        <Navbarlanding />
        <AddProduct>
          <h1 className="addproduct-title">Editar producto</h1>
          <form className="formularioproduct">
            <div className="productinfo">
              <div className="productinfo__left">
                <div className="inputinfo">
                  <label htmlFor="">Nombre del producto:</label>
                  <input
                    name="name"
                    type="text"
                    placeholder={detalle.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="inputinfo">
                  <label htmlFor="price_local">Precio:</label>
                  <input
                    className="price_local__input"
                    name="price_local"
                    type="text"
                    placeholder={"" + detalle.price_local + ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="inputinfo">
                  <label htmlFor="stock">Stock:</label>
                  <input
                    name="stock"
                    type="text"
                    placeholder={"" + detalle.stock + ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="inputinfo">
                  <label htmlFor="description">Descripcion:</label>
                  <textarea
                    name="description"
                    placeholder={detalle.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="inputinfo ultimo__select">
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
                </div>
              </div>
              <div className="productinfo__Right">
                <div className="imageupload">
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => upLoadImage(e)}
                    alt={detalle.image}
                  />
                </div>
              </div>
            </div>
            <Link to="/usuario/editar">
              <button
                className="submitproduct"
                onClick={() => dispatch(productEdit(productId, change))}
              >
                Cambiar
              </button>
            </Link>
          </form>
        </AddProduct>
      </PublicarContainer>
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
