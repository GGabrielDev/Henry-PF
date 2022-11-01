import axios from "axios";

const { API_URL } = process.env;

const productsConnection = axios.create({
  baseURL: `${API_URL}/products`,
  timeout: 8000,
});

export const getAllProducts = async () => {
  const res = await productsConnection.get("/");

  return res.data.result;
};

export const getProductById = async (productId: string) => {
  const res = await productsConnection.get("/", {
    params: productId,
  });

  return res.data;
};
