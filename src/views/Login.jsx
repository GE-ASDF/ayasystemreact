import { useState } from "react"
import fetchData from "../utils/http";
import {createUserSession} from "../utils/createUserSession";
import {useNavigate} from "react-router-dom"

export default function Login(){
    const navigate = useNavigate();
    const [data, setData] = useState({
        Usuario:'',
        Senha:'',
    })
    const [message, setMessage] = useState({
        error:false,
        type:'',
        message:'',
    });

    const handleSetData = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }
    const handleLoginSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetchData("/auth", 'POST', data);
        if(response.error == false){
            createUserSession(response);
            navigate("/admin");
        }else if(response.error == true){
            setMessage({error: true, type:"danger", message:response.message});
        }
   
    }
    const handleClickShowMessage = ()=>{
        setMessage({error: false, type:"", message:""})
    }
    return (
            <div className="form-group">
            {message.error && 
                <div className={`alert alert-${message.type}`}>
                    <div className="d-flex justify-content-between align-items-center">
                        <span>{message.message}</span>
                        <button onClick={handleClickShowMessage} className="btn btn-danger">X</button>
                    </div>
                </div>
            }
            <div className="form-group">
                <label htmlFor="">Usuário</label>
                <input onChange={handleSetData} type="text" name="Usuario" />
            </div>
            <div className="form-group">
                <label htmlFor="">Senha</label>
                <input onChange={handleSetData} type="text" name="Senha" />
            </div>
                <button onClick={handleLoginSubmit} className="btn">Login</button>
            </div>
    )
}