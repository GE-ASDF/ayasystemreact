import { Outlet,useNavigate,  useLocation, Navigate} from "react-router-dom";
import style from "./styles/template.module.css"
import MainNav from "../Components/MainNav";
import DashBoard from "../Components/Dashboard"
import { Helmet } from "react-helmet";
import Button from "../Components/Button";
import Modal from "../Components/Modal";
import { useTheme } from "../Contexts/ThemeContext";
import { useAuth } from "../Contexts/AuthContext";
import { useEffect } from "react";
import { checkAuth } from "../Loaders/checkAuth";
import Cookies from "js-cookie";
import { useState } from "react";
import Loader from "../Components/Loader";
import { useTemplate } from "../Contexts/TemplateContext";

export default function Template(){
    const {dataUser,setDataUser} = useTemplate();
    const {logged, setLogged} = useAuth();
    const local = useLocation().pathname.split("/admin").filter((el)=> el);    
    const themeCtx = useTheme();
    const navigate = useNavigate();
    const token = Cookies.get("token");
   
    useEffect(()=>{
        setLogged(token)
    },[setLogged, token])


    const handleToggleTheme = ()=>{
        if(themeCtx){
            themeCtx.setTheme(themeCtx.theme === 'dark' ? 'light':'dark');
        }
    }
    
    if(!logged){
       return navigate("/login")
    }

    if(dataUser == "null" ){
        Cookies.remove("token")
        return <Navigate to="/login" />;
    }

    return (
        
            <div className={`${style.container}`}>
                    <Helmet><title>AyASystem</title></Helmet>
                    <MainNav />
                    <section className={`${style.rightSide} ${themeCtx?.theme == 'dark' ? `bg-dark text-light`:"bg-light text-dark"}`}>
                        <header className={`${style.headerRightSide} d-flex gap-1 justify-content-end align-items-center`}>
                            <div className={`${style.changeThemeItens}`}>
                                <div style={{border:`1px solid ${themeCtx.theme == "dark" ? "#fff":"#000"}`,justifyContent:`${themeCtx.theme == "dark" ? "flex-end":"flex-start"}`}} className={`rounded ${style.changeThemeBtn}`}>
                                    <div className={`${style.preenchimentoCheck} ${themeCtx.theme == "dark" ? style.preenchimentoCheckDark:style.preenchimentoCheckLight}`}>
                                        {themeCtx.theme == "dark" && <i className="bi bi-stars"></i>}
                                    </div>
                                    {themeCtx.theme != "dark" && <i onClick={handleToggleTheme} title="Tema claro" style={{cursor:"pointer", zIndex:"1"}} className="bi  text-warning fs-6 bi-sun-fill"></i>}
                                    {themeCtx.theme == "dark" && <i onClick={handleToggleTheme} title="Tema escuro" style={{cursor:"pointer", zIndex:"1"}} className="bi text-white  fs-6 bi-moon-fill"></i>}
                                </div>
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
                        <main className="p-3" style={{overflowY:"auto"}}>
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
            </div>
    )
}