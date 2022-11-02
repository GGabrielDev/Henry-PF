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
const {DB_HOST} = process.env || 'localhost';
const {API_PORT} = process.env || '3001';

export const createProduct = (payload: CreateProductResponse) => async () =>{

    try{
        const res = await axios.post<CreateProductResponse>(`http://${DB_HOST}:${API_PORT}/products`, payload,);

        console.log('1')
        return res.data

    }catch (error){
        console.log(error)
    }
}
