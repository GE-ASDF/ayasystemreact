import {RouterProvider, createBrowserRouter} from "react-router-dom"
import PublicRoutes from "./Routes/PublicRoutes"
import PrivateRoutes from "./Routes/PrivateRoutes";
import { ThemeProvider } from "./Contexts/ThemeContext";
import { TemplateProvider } from "./Contexts/TemplateContext";
import { AuthProvider } from "./Contexts/LoggedContext";
import { useState,useEffect } from "react";
import { checkAuth } from "./Loaders/checkAuth";
import Loader from "./Components/Loader"
import { AlertProvider } from "./Contexts/AlertContext";

export default function App(){
  const [logado, setLogado] = useState(null);
  const router =  createBrowserRouter([
    ...(logado == true ? PrivateRoutes() : []), // Condicionalmente adiciona rotas privadas
    ...PublicRoutes()
  ]);

  useEffect(()=>{
    checkAuth().then((res)=>{
      if(res.error == false){
        setLogado(true);
      }else{
        setLogado(false);
      }
    }).catch(()=>{
      setLogado(false);
    })
  },[])
    return (
       
          <AlertProvider>
            <ThemeProvider>
                <AuthProvider>
                    <TemplateProvider>
                        {logado !== null &&

                          <RouterProvider router={router} >
                          </RouterProvider>
                        }
                      {logado == null && 
                        <Loader />
                      }
                    </TemplateProvider>
                    </AuthProvider>
            </ThemeProvider>        
          </AlertProvider>

  )
}