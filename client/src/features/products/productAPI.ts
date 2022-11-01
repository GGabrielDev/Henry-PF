import axios from "axios";
import env from "react-dotenv";

const { API_KEY } = env;

const productConnection = axios.create({
  baseURL: `${API_KEY}/products`,
  timeout: 8000,
});

export const getAllProducts = async () => {
  try {
    const res = await productConnection("/");
    return res.data.results;
  } catch (error) {
    return error;
  }
};

export const getProductById = async (productId: string) => {
  try {
    const res = await productConnection(`/${productId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
