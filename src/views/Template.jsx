import { Outlet,useNavigate,  useLocation} from "react-router-dom";
import style from "./styles/template.module.css"
import MainNav from "../Components/MainNav";
import DashBoard from "../Components/Dashboard"
import { Helmet } from "react-helmet";
import Button from "../Components/Button";
import Modal from "../Components/Modal";
import { useTheme } from "../Contexts/ThemeContext";
import { useLogged } from "../Contexts/LoggedContext";
import { useEffect } from "react";
import { checkAuth } from "../Loaders/checkAuth";
import { useState } from "react";
import {api} from "../utils/api";

export default function Template(){
    const [loading, setLoading] = useState(true)
    const [logged, setLogged] = useState(null)
    const navigate = useNavigate();

    useEffect(()=>{
        const session = localStorage.getItem("logado");
        if(!session){
            navigate("/login")
        }
        const jsonSession = JSON.parse(session);
        const TOKEN = jsonSession?.token;
        
        if(!TOKEN){
            navigate("/login")
        }
        
        fetch("http://localhost:3001/verifyToken",{method:"POST", headers:{
            Authorization: TOKEN,
            "Content-Type": "application/json"
        }}).then((res)=> res.json())
        .then((res)=>{
            if(res.error == false){
                setLogged(true)
            }else{
                setLogged(false)
            }
        }).finally(()=>{
            setLoading(false)
        })
    })
 
    const local = useLocation().pathname.split("/admin").filter((el)=> el);    
    const themeCtx = useTheme();
    

    const handleToggleTheme = ()=>{
        if(themeCtx){
            themeCtx.setTheme(themeCtx.theme === 'dark' ? 'light':'dark');
        }
    }


    return (
            <div className={`${style.container}`}>
                    {!loading && logged && 
                    <>
                    <Helmet><title>AyASystem</title></Helmet>
                    <MainNav />
                    <section className={`${style.rightSide} ${themeCtx?.theme == 'dark' ? `bg-dark text-light`:"bg-light text-dark"}`}>
                        <header className={`${style.headerRightSide} d-flex gap-1 justify-content-end align-items-center`}>
                            <div style={{display:"flex", justifyContent:"flex-start", flex:"1"}} className="form-check form-switch">
                                <input style={{cursor:"pointer"}} onClick={handleToggleTheme} className="form-check-input" defaultChecked={`${themeCtx?.theme == "dark" ? 'checked':''}`} type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                                <label style={{cursor:"pointer"}} className="form-check-label mx-1" htmlFor="flexSwitchCheckChecked">{themeCtx?.theme.toUpperCase()}</label>
                            </div>
                            <Button type="button" className={`btn ${style.myBtnPrimary}  rounded-circle`} data-bs-toggle="modal" data-bs-target="#mandarWhatsApp">
                                <i className="bi bi-chat-left-dots"></i>
                            </Button>
                            <Button type="button" className={`${style.btnZap}`} data-bs-toggle="modal" data-bs-target="#mandarWhatsApp">
                                <i className="bi bi-whatsapp"></i> Mandar WhatsApp
                            </Button>
                            <Button type="button" className={`${style.myBtnPrimary}`} data-bs-toggle="modal" data-bs-target="#mandarWhatsApp">
                                Concluir aula
                            </Button>
                        </header>
                        <main style={{overflowY:"auto"}}>
                        {
                            local.length > 0 ? <Outlet />:
                            <DashBoard />
                        }
                        </main>
                        <footer style={{minHeight:"auto"}} className={`p-3`}>
                            Rodapé
                        </footer>
                    </section>
                    <Modal className={`${themeCtx?.theme == 'dark' ? `bg-dark text-light`:"bg-light text-dark"}`} modalSize="modal-lg" modalTitle="Mandar WhatsApp" id="mandarWhatsApp">

                    </Modal>
                    </>
                }
            {!loading && !logged && navigate("/login")}
            </div>
    )
}