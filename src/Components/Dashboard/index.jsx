import { useTheme } from "../../Contexts/ThemeContext";
import BatCard from "../BatCard";
import style from "./style.module.css"
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
            <h1 className={`${style.titleNews} ${themeCtx?.theme == 'dark' ? `bg-dark w-50 text-light`:"bg-light"}`}>
                Novidades
            </h1>
            <div>
                <BatCard>
                    <span className="fs-6">Matrículas OM</span>
                    <span className="fs-6">{getMonth()}</span>
                    <h1 className={`${style.yellowText} fs-3`}>4</h1>
                </BatCard>
            </div>
        </div>
        </>
    )
}