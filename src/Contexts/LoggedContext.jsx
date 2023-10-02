import { createContext, useContext, useEffect, useState } from "react";
import fetchData from "../utils/http";
import {checkAuth} from "../Loaders/checkAuth.js";


export const AuthContext = createContext(null);


export const AuthProvider = ({children})=>{
    const [loading, setLoading] = useState(true)
    const [logged, setLogged] = useState(null)
    const handleLogged = ()=>{
      setLogged(false)
    }
    useEffect(()=>{
        checkAuth().then((res)=>{
          if(res.error == false){
            setLogged(true);
          }else{
            setLogged(false);
          }
        }).finally(()=>{
            setLoading(false)
        })
      },[logged])

    return (
        <AuthContext.Provider value={{logged, setLoading, loading, handleLogged}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useLogged = ()=> useContext(AuthContext);