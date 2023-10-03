import {useOutletContext,useLocation, useLoaderData,useNavigate} from "react-router-dom"
import Button from "../../../../Components/Button";

export default function Contatos(){
    const data = useLoaderData();
    console.log(data)
    const local = useLocation().pathname.split("/contatos").filter((el)=> el);   
    const [handleGetInfoStudent] = useOutletContext();
    const navigate = useNavigate();
    const handleNavigate = ()=>{
        navigate(`${local[0]}`);
    }
    return (
        <div>
            <Button className="btn close btn-danger" onClick={()=> {handleGetInfoStudent(); handleNavigate()}} >X</Button>
        </div>
    )
}