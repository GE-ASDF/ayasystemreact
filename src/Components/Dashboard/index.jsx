import { useTheme } from "../../Contexts/ThemeContext";
import BatCard from "../BatCard";
import {Card, CardBody, CardHeader} from "../Cards/Cards";
import style from "./style.module.css"
import { useEffect, useState } from "react";
import fetchData from "../../utils/http";
import Loader from "../Loader";
import Button from "../Button";
import Months from "../Months";
import Days from "../Days";
import MatriculadosOm from "../MatriculadosOm";
import MatriculadosOM from "../../views/admin/matriculadosom";
import { Outlet } from "react-router-dom";



  

export default function DashBoard(){
    const themeCtx = useTheme();

    const getMonth = ()=>{
        return new Date().toLocaleDateString('pt-Br', {month:"short", year:"numeric"})
    }

    return (
        <>
        <div className={style.batContainer}>
            <BatCard linkTo="/admin/presencas">
                <i className="bi bi-check2-circle"></i>
                <span className="fs-6">Presenças</span>
            </BatCard>
            <BatCard linkTo="/admin/agenda">
                <i className="bi fs-7 bi-calendar-date"></i>
                <span className="fs-6">Agenda</span>
            </BatCard>
        </div>
        <div className="d-flex flex-column justify-content-start align-items-start">
            <h1 className={`${style.titleNews} ${themeCtx?.theme == 'dark' ? `bg-dark w-25 text-3xl text-light`:"bg-light w-25 text-3xl"}`}>
                Novidades
            </h1>
            <div className="d-grid flex-row">
                
                <div className="d-flex flex-wrap gap-2">
                <div className="d-block">
                    <BatCard linkTo="matriculadosom">
                        <span className="fs-6">Matrículas OM</span>
                        <span className="fs-6">{getMonth()}</span>
                        <span className={`${style.yellowText} fs-3`}>4</span>
                    </BatCard>
                </div>
                </div>
            </div>
            
        </div>
        </>
    )
}