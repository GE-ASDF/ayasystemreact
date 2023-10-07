import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import fetchData from "../utils/http";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [logged, setLogged] = useState(Cookies.get("token") || ''); 
    const urlToValidateToken = import.meta.env.VITE_BASE_URL_BACKEND + "/verifyToken";
    const options = {method:"POST", headers:{"Content-Type":"application/json", Authorization:logged}}

    const checkToken = async ()=>{
        const response = await fetch(`${urlToValidateToken}`,options)
        const verifying = await response.json();
        if(verifying.error == true){
            setLogged('');
            localStorage.removeItem('logado');
            Cookies.remove("token")
        }
    }
    
    useEffect(()=>{
        checkToken();
    })
    
    return (
        <AuthContext.Provider value={{setLogged, logged}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> useContext(AuthContext);