import { useState, useEffect } from "react"
import fetchData from "../utils/http";
import {createUserSession, setUserCookie} from "../utils/createUserSession";
import {useNavigate} from "react-router-dom"
import Loader from "../Components/Loader";
import Button from "../Components/Button";
import {useForm} from "react-hook-form"
import Input from "../Components/Forms/SignIn/SignIn";
import Alert from "../Components/Alert";
import {checkAuth} from "../Loaders/checkAuth"
import { useAlert } from "../Contexts/AlertContext";
import Cookies from "js-cookie";
export default function Login(){
    const {alert, setAlert} = useAlert();
    const {control, handleSubmit} = useForm();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [cookieOk, setCookie] = useState(false)
    const handleLoginSubmit = async ()=>{
        setLoading(true)
        try{
            const response = await fetchData("/auth", 'POST', control._formValues);

            if(response.error == false){
                setUserCookie(response.token)
                delete response.token;
                createUserSession(response);                    
                setLoading(false);
                if(verifyCookie()){
                    navigate("/admin")
                }
                // navigate("/admin")
                // window.location.href = "/admin"
            }else if(response.error == true){
                setLoading(false)
                setAlert({type:'danger',show:true,time:7,message:response.message})
            }
        }catch(err){
            setLoading(false);
        }
        setLoading(false)
    }
    const verifyCookie = ()=>{
        const cookie = Cookies.get("token");
        if(cookie){
            return true;
        }
    }

    return (
            <div style={{height:"100vh"}} className={`container-fluid justify-content-center align-items-center mybg-primary`}>
                {loading && <Loader />}
                <div id="form-login" className="row h-100">
                <form onSubmit={handleSubmit(handleLoginSubmit)} style={{minWidth:"250px"}} className="d-flex justify-content-center h-100 col-lg-6 gap-2 w-25 text-white p-4 bg-transparent rounded flex-column ">
                <figure className="d-flex m-0 flex-column justify-content-center align-items-center">
                    <img src="/img/logo.png" alt="Logo AyaSystem" className="w-25" />
                    <legend className="text-center fw-bold">AyASystem</legend>
                </figure>
                  
                <Input defaultValue="" type="text" name="Usuario" rules={{required:"O campo usuário é obrigatório", pattern:{value:/[a-z]/i, message:"O campo deve começar com uma letra."}}} control={control} />
                <Input defaultValue="" type="password" name="Senha" rules={{required:"O campo senha é obrigatório"}} control={control} />

                <div className="d-flex">
                    <Button className={`btn myBtnPrimary`}>Login</Button>
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