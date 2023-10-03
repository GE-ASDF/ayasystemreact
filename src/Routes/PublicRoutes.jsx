import { Navigate } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import { checkAuth } from "../Loaders/checkAuth";
import ErrorBoundary from "../views/ErrorBoundary";

export default function PublicRoutes(){
    return [
        {path:"/", element:<Home />},
        {path:"/login", errorElement:<ErrorBoundary />, element:<Login />},
        {path:"*", element:<Navigate to="/login" replace />}
    ]
}