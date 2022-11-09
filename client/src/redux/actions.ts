import axios from "axios";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const FILTER_PRICE = "FILTER_PRICE";
export const PUT_WORKER_PREMIUM = "PUT_WORKER_PREMIUM";
export const PAY = "PAY";


type CreateProductResponse = {
  name: string;
  price_local: number;
  stock: number;
  description: string;
  suspended: string;
  image: string;
};

const { REACT_APP_API_KEY } = process.env || "localhost:3001";

export const createProduct = (payload: CreateProductResponse) => async () => {
  try {
    const res = await axios.post<CreateProductResponse>(
      `http://localhost:3001/products`,
      payload
    );

    console.log(
      "Se posteó al http://localhost:3001/products un producto correctamente"
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export function sendNotification(email: any, type: any) {
  const info = { email, type };
  return function () {
    axios.post(`${REACT_APP_API_KEY}mailNotifications`, info);
  };
}

export function pay(paymentMethod: any) {
  //cambiar estado premium del modelo  de wokrers
  return async function (dispatch: any) {
    try {
      const response = await axios.post(REACT_APP_API_KEY + "payments", {
        paymentMethod,
      });

      const r = response.data;
      dispatch({
        type: PAY,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
}

export function premiumPay(payload: any) {
  return async function (dispatch: any) {
    const worker = await axios.put(REACT_APP_API_KEY + "worker/" + payload, {
      premium: true,
    });
    dispatch({
      type: PUT_WORKER_PREMIUM,
    });
    return "worker";
  };
}
