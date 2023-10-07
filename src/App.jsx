import {RouterProvider, createBrowserRouter, useNavigate} from "react-router-dom"
import PublicRoutes from "./Routes/PublicRoutes"
import PrivateRoutes from "./Routes/PrivateRoutes";
import { ThemeProvider } from "./Contexts/ThemeContext";
import { TemplateProvider } from "./Contexts/TemplateContext";
import { useState,useEffect } from "react";
import Loader from "./Components/Loader"
import { AlertProvider } from "./Contexts/AlertContext";
import Cookies from "js-cookie"
import { checkAuth } from "./Loaders/checkAuth";
import fetchData from "./utils/http";
import { AuthProvider } from "./Contexts/AuthContext";

export default function App(){
  const [loading, setLoading] = useState(false)
  const [logged, setLogged] = useState(null)
  const privateRoutes = PrivateRoutes(logged);
  const publicRoutes = PublicRoutes();
  let allRoutes = [...publicRoutes, ...privateRoutes];

  const router =  createBrowserRouter(allRoutes);

    const verifyingAuth = async ()=>{
      setLoading(true);
      const verified = await checkAuth();
      if(verified.error == false && verified.logged == true){
        setLogged(true);
        setLoading(false);
      }else{
        setLogged(false);
        setLoading(false);
      }
    }
    
    useEffect(()=>{
      verifyingAuth()
    },[logged])

    if(loading){
      return <Loader />
    }

    return (
      <AuthProvider>
          <AlertProvider>
      <TemplateProvider>
            <ThemeProvider>
                  {logged !== null &&
                    <RouterProvider router={router} >
                    </RouterProvider>
                  }
                  {logged == null && 
                    <Loader />
                  }
            </ThemeProvider>        
        </TemplateProvider>
          </AlertProvider>
        </AuthProvider>

  )
}