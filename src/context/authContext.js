import { onAuthStateChanged } from "@firebase/auth";
import {  createContext , useEffect, useReducer } from "react";
import { auth } from "../firebase/config";

export const AuthContext = createContext()


export function authReducer(state,action){
    switch (action.type) {
        case 'LOG_IN': 
            return {...state, user: action.payload}  
        case 'LOG_OUT':
            return {...state , user: null}
        case 'AUTH_IS_READY':
            return { user: action.payload , authIsReady: true }
        default:
            return state;
    }    
}

export const AuthContextProvider = ({children})=>{

const [state,dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
})

useEffect(()=>{
    const unsub = onAuthStateChanged(auth,(user)=>{
        dispatch({type: 'AUTH_IS_READY', payload: user})        
    })
    return (()=>unsub()) 
}, [])

// console.log(state);

    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}