import { Navigate } from "react-router-dom";
import Template from "../views/Template";
import Agenda from "../views/admin/agenda/index";
import loaderAgenda from "../Loaders/loaderAgenda";

export default function PrivateRoutes(){
        return [{
            path: "/admin",
            element: <Template />,
            children:[
                {
                    path:"agenda/:weekDay?",
                    loader: loaderAgenda,
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