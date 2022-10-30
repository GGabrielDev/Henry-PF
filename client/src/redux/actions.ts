import axios from 'axios';
export const GET_PRODUCTS='GET_PRODUCTS';

type CreateProductResponse={
    name: string,
    price_local: number,
    stock: number,
    description: string,
    suspended: string,
    url:string
}

export const createProduct = (payload: object) => async () =>{
    try{
        const res = await axios.post<CreateProductResponse>("http://localhost:3001/products", payload, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },},);
        console.log(res)
        return res

    }catch (error){
        console.log(error)
    }
}
export const getAllProducts = () => async (dispatch:any)=>{
    try {
        const res = await axios.get("http://localhost:3001/products");
    console.log(res);
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
    } catch (error) {
        console.log(error);
    }
}