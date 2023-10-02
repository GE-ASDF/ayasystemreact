import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import style from "./styles/template.module.css"
import MainNav from "../Components/MainNav";
import { useState } from "react";
import DashBoard from "../Components/Dashboard"
import { Helmet } from "react-helmet";
import Button from "../Components/Button";
import Modal from "../Components/Modal";
import { useTheme } from "../Contexts/ThemeContext";


export default function Template(){
    const loaderDta = useLoaderData();
    console.log(loaderDta);
    const local = useLocation().pathname.split("/admin").filter((el)=> el);    
    const themeCtx = useTheme();

    const handleToggleTheme = ()=>{
        if(themeCtx){
            themeCtx.setTheme(themeCtx.theme === 'dark' ? 'light':'dark');
        }
    }

    return (
        <div  className={`${style.container}`}>
                <Helmet><title>AyASystem</title></Helmet>
                <MainNav />
                <section className={`${style.rightSide} ${themeCtx?.theme == 'dark' ? `bg-dark text-light`:"bg-light text-dark"}`}>
                    <header className="d-flex  gap-1 justify-content-end align-items-center">
                        <div style={{display:"flex", justifyContent:"flex-start", flex:"1"}} className="form-check form-switch">
                            <input style={{cursor:"pointer"}} onClick={handleToggleTheme} className="form-check-input" defaultChecked={`${themeCtx?.theme == "dark" ? 'checked':''}`} type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                            <label style={{cursor:"pointer"}} className="form-check-label mx-1" htmlFor="flexSwitchCheckChecked">{themeCtx?.theme.toUpperCase()}</label>
                        </div>
                        <Button type="button" className={`${style.myBtnPrimary}  rounded-circle btn-sm`} data-bs-toggle="modal" data-bs-target="#mandarWhatsApp">
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
                    <footer>
                        rodapé
                    </footer>
                </section>
                <Modal className={`${themeCtx?.theme == 'dark' ? `bg-dark text-light`:"bg-light text-dark"}`} modalSize="modal-lg" modalTitle="Mandar WhatsApp" id="mandarWhatsApp">

                </Modal>
        </div>
    )
}