import backAxios from "../helpers/Axios";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const FILTER_PRICE = "FILTER_PRICE";
export const POST_FAVORITE = "POST_FAVORITE";

const { REACT_APP_API_KEY } = process.env || "localhost:3001";

export const createProduct = (payload) => async () => {
  try {
    const res = await backAxios.post(`/products`, payload);

    console.log("Se posteó al /products un producto correctamente");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const mercadoPago = (payload) => async () => {
  try {
    const res = await backAxios.post("/comprar", payload);
    console.log(res.data);
    console.log("Se posteó al /comprar un producto correctamente");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const productEdit = (productId, payload) => async () => {
  try {
    const res = await backAxios.put(`/products/${productId}`, payload);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteProduct = (productId) => async () => {
  try {
    const res = await backAxios.delete(`/products/${productId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const agregarFavorito = (payload) => async () => {
  try {
    const res = await backAxios.post(`/favorites`, payload);

    console.log("Se posteó al /products un producto correctamente");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
