import { useContext } from "react";
import { useEffect } from "react";
import { createContext,useState } from "react";
import fetchData from "../utils/http";
import { useLogged } from "./LoggedContext";

const TemplateContext = createContext(null);

export const TemplateProvider = ({children})=>{
    const [dataUser, setDataUser] = useState(localStorage.getItem("logado"))

    useEffect(()=>{
        localStorage.setItem("logado", dataUser);
    },[dataUser])
    
    return (
        <TemplateContext.Provider value={{dataUser, setDataUser}}>
            {children}
        </TemplateContext.Provider>
    )
}

export const useTemplate = ()=> useContext(TemplateContext);
