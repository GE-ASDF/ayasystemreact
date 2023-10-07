import { useContext } from "react";
import { useEffect } from "react";
import { createContext,useState } from "react";
import { Navigate } from "react-router-dom";


const TemplateContext = createContext();

export const TemplateProvider = ({children})=>{
    const [dataUser, setDataUser] = useState(localStorage.getItem("logado"))
    const [loading, setLoading] = useState(false)
  
    useEffect(()=>{
        localStorage.setItem("logado", dataUser);
    },[dataUser])

    return (
        <TemplateContext.Provider value={{dataUser,setLoading,loading, setDataUser}}>
            {children}
        </TemplateContext.Provider>
    )
}

export const useTemplate = ()=> useContext(TemplateContext);
