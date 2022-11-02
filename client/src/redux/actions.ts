import axios from 'axios';
export const GET_PRODUCTS='GET_PRODUCTS';
export const FILTER_PRICE='FILTER_PRICE'

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

        console.log('1')
        return res.data

    }catch (error){
        console.log(error)
    }
}
