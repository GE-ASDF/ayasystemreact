import { Navigate } from "react-router-dom";
import Template from "../views/Template";
import Agenda from "../views/admin/agenda/index";
import { checkAuth } from "../Loaders/checkAuth";
export default function PrivateRoutes(){
    return [{
            path: "/admin",
            element: <Template />,
            loader:checkAuth,
            children:[
                {
                    path:"agenda",
                    element: <Agenda />,
                },
                {
                    path:"presencas",
                    element: <Agenda />,
                },
            ],
        },
        {path:"*", element:<Navigate to="/admin" replace />}
    ];
}