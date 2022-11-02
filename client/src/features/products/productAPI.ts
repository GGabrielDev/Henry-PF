import axios from "axios";


const { API_KEY } = process.env;




const productConnection = axios.create({
  baseURL: `http://localhost:3001/products`,
  timeout: 8000,
});



const  REACT_APP_API_KEY  = 'http://localhost:3001';

console.log(REACT_APP_API_KEY)

export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${REACT_APP_API_KEY}/products`);
    return res.data.results;
  } catch (error) {
    return error;
  }
};

export const getProductById = async (productId: string) => {
  try {
    const res = await axios.get(`${REACT_APP_API_KEY}/${productId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
