import { Navigate } from "react-router-dom";
import Template from "../views/Template";
import Agenda from "../views/admin/agenda/index";
import loaderAgenda from "../Loaders/loaderAgenda";
import ErrorBoundary from "../views/ErrorBoundary";

export default function PrivateRoutes(){
        return [{
            path: "/admin",
            element: <Template />,
            errorElement:<ErrorBoundary />,
            children:[
                {
                    path:"agenda/:weekDay?",
                    loader: loaderAgenda,
                    element: <Agenda />,
                    errorElement:<ErrorBoundary />,
                },
                {
                    path:"presencas",
                    element: <Agenda />,
                    errorElement:<ErrorBoundary />,
                },
            ],
        },
        {path:"*", element:<Navigate to="/admin" replace />}
    ];
}