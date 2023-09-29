import { Outlet, useLocation } from "react-router-dom";
import style from "./styles/template.module.css"
import MainNav from "../Components/MainNav";
import { useState } from "react";
import DashBoard from "../Components/Dashboard"
import { Helmet } from "react-helmet";
import Button from "../Components/Button";
import Modal from "../Components/Modal";


export default function Template(){
    const local = useLocation().pathname.split("/admin").filter((el)=> el);    

    const [showWhatsaAppModal, setShowWhatsAppModal] = useState(false);
    const openModal = (e)=>{
        setShowWhatsAppModal((c)=> c = !c)
    }
    const closeModal = (e)=>{
        setShowWhatsAppModal((c) => c = false)
    }
    document.addEventListener("keydown", (e)=>{
        if(e.key.toLowerCase() == 'escape'){
            setShowWhatsAppModal(false)
        }
    })

    return (
        <div className={style.container}>
                <Helmet><title>AyASystem</title></Helmet>
                <MainNav />
                <section className={style.rightSide}>
                    <header className="d-flex gap-1 justify-content-end">
                        <Button type="button" className={`${style.myBtnPrimary} rounded-circle btn-sm`} data-bs-toggle="modal" data-bs-target="#mandarWhatsApp">
                            <i class="bi bi-chat-left-dots"></i>
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
                <Modal modalSize="modal-lg" modalTitle="Mandar WhatsApp" id="mandarWhatsApp">

                </Modal>
        </div>
    )
}