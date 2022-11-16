import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useLocalStorage = <T>(key:string, initialValue:T | (()=> T))=>{
    const {isAuthenticated, user} = useAuth0(); 
     const [value, setValue] = useState<T>(()=>{
        const jsonValue = localStorage.getItem(key)
        if(jsonValue != null) return JSON.parse(jsonValue)
        if(typeof initialValue === "function"){
            return (initialValue as ()=> T)()
        }else{
            return initialValue
        }
    })
    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    },[key,value])
       return [value, setValue] as [typeof value, typeof setValue]   
}
