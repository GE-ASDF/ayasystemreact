import { useState } from "react"
import fetchData from "../utils/http";
import {createUserSession} from "../utils/createUserSession";
import {useNavigate} from "react-router-dom"
import Loader from "../Components/Loader";
import Button from "../Components/Button";


export default function Login(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
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
        setLoading(true)
        try{
            const response = await fetchData("/auth", 'POST', data);
            if(response.error == false){
                createUserSession(response);
                window.location.href = "/admin"
            }else if(response.error == true){
                setLoading(false)
                setMessage({error: true, type:"danger", message:response.message});
            }
        }catch(err){
            setLoading(false);
        }
    }
    const handleClickShowMessage = ()=>{
        setMessage({error: false, type:"", message:""})
    }
    if(message.error == true){
        setTimeout(() => {
            setMessage({error:false, type:"",message:""})
        }, 7000);
    }
    return (
            <div style={{height:"100vh"}} className={`container-fluid justify-content-center align-items-center mybg-primary`}>
                {loading && <Loader />}
                <div id="form-login" className="row h-100">
                <form style={{minWidth:"250px"}} className="d-flex justify-content-center h-100 col-lg-6 gap-2 w-25 text-white p-4 bg-transparent rounded flex-column ">
                <figure className="d-flex m-0 flex-column justify-content-center align-items-center">
                    <img src="/img/logo.png" alt="Logo AyaSystem" className="w-25" />
                    <legend className="text-center fw-bold">AyASystem</legend>
                </figure>
                {message.error && 
                    <div style={{position:"absolute", top:"10px", left:"10px"}} className={`alert alert-${message.type}`}>
                        <div className="d-flex justify-content-between gap-3 align-items-center">
                            <span>{message.message}</span>
                            <Button className="btn btn-danger" onClick={handleClickShowMessage}>
                                X
                            </Button>
                        </div>
                    </div>
                }
                <div className="form-group">
                    <label htmlFor="">Usuário</label>
                    <input autoFocus="autofocus" className={`form-control w-100`} placeholder="Digite seu usuário" onChange={handleSetData} type="text" name="Usuario" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Senha</label>
                    <input className={`form-control w-100`} placeholder="Digite sua senha" onChange={handleSetData} type="password" name="Senha" />
                </div>
                <div className="d-flex">
                    <button onClick={handleLoginSubmit} className={`btn myBtnPrimary`}>Login</button>
                </div>
                </form>
                <div id="right-side-login" style={{borderBottomLeftRadius:"100%"}} className="p-4 d-flex justify-content-center align-items-center gap-4  col-lg">
                    <div style={{marginBottom:"50px"}} className="d-flex gap-3 h-100 justify-conten-center align-items-center">
                        <h2 className="fw-bold fs-1">Seja bem-vindo(a)</h2>
                        <img id="logo-animada" src="/img/logo.png" alt="" />
                    </div>
                </div>
                </div>

            </div>

    )
}