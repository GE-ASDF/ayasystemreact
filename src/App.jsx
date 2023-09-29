import {RouterProvider, createBrowserRouter} from "react-router-dom"
import PublicRoutes from "./Routes/PublicRoutes"
import PrivateRoutes from "./Routes/PrivateRoutes";
import TemplateContext from "./Contexts/TemplateContext";
import { useState } from "react";


export async function checkAuth(){
  const data = await fetch("http://localhost:3000",{method:"GET"})
    const res = await data.json();
    return res;
}

export default function App(){
  const userData = JSON.parse(localStorage.getItem("logado"))
  const [logado, setLogado] = useState(true);
  checkAuth().then((re)=>{
    console.log(re)
  })

  console.log(logado)
  const router = createBrowserRouter([
    ...(logado ? PrivateRoutes() : []), // Condicionalmente adiciona rotas privadas
    ...PublicRoutes()
  ]);
  
  return (
    <TemplateContext.Provider value={userData}>
        <RouterProvider router={router}>
          <TemplateContext></TemplateContext>
        </RouterProvider>
    </TemplateContext.Provider>
  )
}