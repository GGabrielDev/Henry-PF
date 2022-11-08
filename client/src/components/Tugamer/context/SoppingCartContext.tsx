import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../../../app/hooks";
import  ShoppingCart  from '../ShoppingCart';

type ShoppingCartProviderProps ={
    children: ReactNode
}
type CartItem={
    id:string
    quantity:number
}

type ShoppingCartContext ={
    openCart: ()=>void
    closeCart: ()=>void
    getItemQuantity: (id:string)=> number
    incrementCartQuantity: (id:string)=>void
    decrementCartQuantity: (id:string)=>void
    removeFromCart: (id:string)=>void
    cartQuantity:number
    cartItems:CartItem[]
}
const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider({children}:ShoppingCartProviderProps){
    const [cartItems, setCartItems]= useLocalStorage<CartItem[]>("shopping-cart",[])
    const [isOpen, setIsOpen]= useState(false)

    const cartQuantity = cartItems.reduce((quantity, item)=> item.quantity + quantity, 0)

    const openCart =()=>setIsOpen(true)

    const closeCart =()=>setIsOpen(false)

    function getItemQuantity(id:string){
        return cartItems.find(item => item.id === id )?.quantity||0
    }

    function incrementCartQuantity(id: string){
        setCartItems( currentItem => {
            if(currentItem.find(item => item.id === id) == null){
                
                return [...currentItem, { id, quantity: 1 }]
            }else{
                return currentItem.map(item => {
                    if(item.id === id){
                      
                        return {...item, quantity: item.quantity + 1}
                    }else{
                        
                        return item
                    }
                })
            }
        })
    }
    function decrementCartQuantity(id: string){
        setCartItems(currentItem => {
            if(currentItem.find(item => item.id===id)?.quantity===1){
                return currentItem.filter(item => item.id !== id)
            }else{
                return currentItem.map(item => {
                    if(item.id === id){
                        return{ ...item, quantity: item.quantity - 1}
                    }else{
                        return item
                    }
                })
            }
        })
    }
    function removeFromCart(id: string){
        setCartItems(currentItem=>{
            return currentItem.filter(item=> item.id!== id)
        })
    }
    return (
        <ShoppingCartContext.Provider value={{getItemQuantity, incrementCartQuantity, decrementCartQuantity, openCart, closeCart, removeFromCart, cartQuantity, cartItems}}>
            {children}
            
            <ShoppingCart  isOpen={isOpen}  />
        </ShoppingCartContext.Provider>
    )
}