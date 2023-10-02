import {RouterProvider, createBrowserRouter, useFetcher, useLoaderData} from "react-router-dom"
import PublicRoutes from "./Routes/PublicRoutes"
import PrivateRoutes from "./Routes/PrivateRoutes";
import TemplateContext from "./Contexts/TemplateContext";

import {ThemeProvider} from "./Contexts/ThemeContext";



export default function App(){
  const userData = JSON.parse(localStorage.getItem("logado"))
  const logado = true;
 

  const router = createBrowserRouter([
    ...(logado == true ? PrivateRoutes() : []), // Condicionalmente adiciona rotas privadas
    ...PublicRoutes()
  ]);

    return (
    <ThemeProvider>
      <TemplateContext.Provider value={userData}>
          <RouterProvider router={router}>
            <TemplateContext></TemplateContext>
          </RouterProvider>
      </TemplateContext.Provider>
    </ThemeProvider>
  )
}