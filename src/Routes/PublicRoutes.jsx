import { Navigate } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import { checkAuth } from "../Loaders/checkAuth";

export default function PublicRoutes(){
    return [
        {path:"/", element:<Home />},
        {path:"/login", element:<Login />},
        {path:"*", element:<Navigate to="/login" replace />}
    ]
}