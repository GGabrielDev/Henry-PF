import {
    GET_PRODUCTS
} from "./actions"
export interface Action{
    type:string,
    payload:any
}

const initialState = { 
    loggedIn:false,
    products:[],
    productsAll:[],

};
export function reducers(state= initialState, action:Action){
    switch(action.type){
        case 'LOGIN':
            return {
                ...action.payload,
                loggedIn:true
            }
        case 'LOGOUT':
            return{
                loggedIn:false
            }
        case GET_PRODUCTS:
            
            return{
            ...state,
            products:action.payload,
            productsAll:action.payload
            }
        default:
            return state;
    }
}