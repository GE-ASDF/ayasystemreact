import { Navigate } from "react-router-dom";
import Template from "../views/Template";
import Agenda from "../views/admin/agenda/index";
import loaderAgenda from "../Loaders/loaderAgenda";

export default function PrivateRoutes(){
        return [{
            path: "/admin",
            element: <Template />,
            errorElement:<p>Ocorreu um erro</p>,
            children:[
                {
                    path:"agenda/:weekDay?",
                    loader: loaderAgenda,
                    errorElement:<p>Ocorreu um erro</p>,
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