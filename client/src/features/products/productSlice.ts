import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from 'axios'


export type ProductType={
    id:string,
    name:string,
    stock:number,
    price_local:number,
    description:string,
    price_dolar:number|null|undefined,
    image:string|null|undefined,
    suspended: boolean,
    size:string|null|undefined,
}
export interface SliceState{
    products:ProductType[],
    productsAll: ProductType[]
}

const initialState:SliceState = { 
    
    products:[],
    productsAll:[],

};

export const getProducts = createAsyncThunk('product/getProducts',
async()=>{
    try {
        const res = await axios.get("http://localhost:3001/products");
    
    return res.data.result;
    } catch (error) {
        console.log(error);
    }
}
)


export const productSlice = createSlice({name:'product', initialState, reducers:{
    filterAsc:(state,action:PayloadAction<string>)=> {
    const allproducts = state.productsAll
    const ordenamiento=
    action.payload ==='asc'? allproducts.sort(function (a, b) {
        return a.price_local - b.price_local
    }): action.payload ==='des'? allproducts.sort(function (a, b) {
            return b.price_local- a.price_local
          })
        : state.productsAll
        state.products= ordenamiento
           
        },

    

},extraReducers:(builder)=>{
    builder.addCase(getProducts.fulfilled, (state,action:PayloadAction<ProductType[]>)=>{
        state.products=action.payload
        state.productsAll=action.payload
    })
}
})

export const {filterAsc}= productSlice.actions

export const selectProducts = (state:RootState)=> state.products.productsAll
export const selectFilterProducts = (state:RootState)=> state.products.products


export default productSlice.reducer