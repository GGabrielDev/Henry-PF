import axios from 'axios';
export const GET_PRODUCTS='GET_PRODUCTS';
export const FILTER_PRICE='FILTER_PRICE'
export const SEARCH_PRODUCT='SEARCH_PRODUCT'

type CreateProductResponse={
    name: string,
    price_local: number,
    stock: number,
    description: string,
    suspended: string,
    url:string
}

const {REACT_APP_API_KEY} = process.env || 'localhost:3001';

export const createProduct = (payload: CreateProductResponse) => async () =>{

    try{
        const res = await axios.post<CreateProductResponse>(`http://localhost:3001/products`, payload,);

        console.log('Se posteó al http://localhost:3001/products un producto correctamente')
        return res.data

    }catch (error){
        console.log(error)
    }
}

export const searchCountr = (name:any) => async (dispatch:any) => {
    const res = await axios.get(`http://localhost:3001/products?name=${name}`);
    dispatch({
      type: SEARCH_PRODUCT,
      payload: res.data,
    });
  };
