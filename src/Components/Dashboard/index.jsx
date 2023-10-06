import { useTheme } from "../../Contexts/ThemeContext";
import BatCard from "../BatCard";
import {Card, CardBody, CardHeader} from "../Cards/Cards";
import style from "./style.module.css"
import { Months } from "../../constants/contants";
export default function DashBoard(){
    const themeCtx = useTheme();
    const getMonth = ()=>{
        return new Date().toLocaleDateString('pt-Br', {month:"short", year:"numeric"})
    }
    return (
        <>
        <div className={style.batContainer}>
            <BatCard href="/admin/presencas">
                <i className="bi bi-check2-circle"></i>
                <span className="fs-6">Presenças</span>
            </BatCard>
            <BatCard href="/admin/agenda">
                <i className="bi fs-7 bi-calendar-date"></i>
                <span className="fs-6">Agenda</span>
            </BatCard>
        </div>
        <div>
            <h1 className={`${style.titleNews} ${themeCtx?.theme == 'dark' ? `bg-dark w-25 text-3xl text-light`:"bg-light w-25 text-3xl"}`}>
                Novidades
            </h1>
            <div className="d-flex flex-wrap">
                <div>
                <BatCard>
                    <span className="fs-6">Matrículas OM</span>
                    <span className="fs-6">{getMonth()}</span>
                    <h1 className={`${style.yellowText} fs-3`}>4</h1>
                </BatCard>
                </div>
            </div>
            
        </div>
        </>
    )
}