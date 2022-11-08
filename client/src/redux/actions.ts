import axios from 'axios';
export const GET_PRODUCTS='GET_PRODUCTS';
export const FILTER_PRICE='FILTER_PRICE'

type CreateProductResponse={
    name: string,
    price_local: number,
    stock: number,
    description: string,
    suspended: string,
    image:string
}

type Mercadop={
    price_local: number,
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

export const mercadoPago = (payload: Mercadop) => async () =>{

    try{
        console.log(1)
        const res = await axios.post<Mercadop>("http://localhost:3001/comprar", payload,);
        console.log(res.data)
        console.log('Se posteó al http://localhost:3001/comprar un producto correctamente')
        return res.data

    }catch (error){
        console.log(error)
    }
}

