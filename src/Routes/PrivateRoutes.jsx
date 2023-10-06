import { Navigate } from "react-router-dom";
import Template from "../views/Template";
import Agenda from "../views/admin/agenda/index";
import loaderAgenda from "../Loaders/loaderAgenda";
import ErrorBoundary from "../views/ErrorBoundary";
import Contatos from "../views/admin/agenda/pages/Contatos";
import Historicos from "../views/admin/agenda/pages/Historicos";
import { loaderContatos } from "../Loaders/loaderContatos";
import { loaderHistoricos } from "../Loaders/loaderHistoricos";
import { loaderPresencas } from "../Loaders/loaderPresencas";
import Presencas from "../views/admin/presencas";

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
                    children:[
                        {
                            path:"contatos/:CodigoContrato",
                            element: <Contatos />,
                            loader:loaderContatos,
                            errorElement:<ErrorBoundary />,
                        },
                        {
                            path:"historicos/:CodigoContrato",
                            element: <Historicos />,
                            loader:loaderHistoricos,
                            errorElement:<ErrorBoundary />,
                        }
                    ]
                },
                {
                    path:"presencas/:DataPresenca?",
                    element: <Presencas />,
                    loader:loaderPresencas,
                    errorElement:<ErrorBoundary />,
                    children:[
                        {
                            path:"contatos/:CodigoContrato",
                            element: <Contatos />,
                            loader:loaderContatos,
                            errorElement:<ErrorBoundary />,
                        },
                        {
                            path:"historicos/:CodigoContrato",
                            element: <Historicos />,
                            loader:loaderHistoricos,
                            errorElement:<ErrorBoundary />,
                        }
                    ]
                },
            ],
        },
        {path:"*", element:<Navigate to="/admin" replace />}
    ];
}