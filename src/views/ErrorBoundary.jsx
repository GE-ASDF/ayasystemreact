import { isRouteErrorResponse, useLocation, useRouteError } from "react-router-dom";
import {Link} from "react-router-dom"
export default function ErrorBoundary(){
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
          return <div>This page doesn't exist!</div>;
        }
    
        if (error.status === 401) {
          return <div>You aren't authorized to see this</div>;
        }
    
        if (error.status === 503) {
          return <div>Looks like our API is down</div>;
        }
    
        if (error.status === 418) {
          return <div>Erro</div>;
        }
      }
    
      return <div>Something went wrong <Link to="/admin" className="btn btn-primary">Back to start</Link></div>;
}