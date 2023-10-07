import { useTheme } from "../../Contexts/ThemeContext";
import BatCard from "../BatCard";
import {Card, CardBody, CardHeader} from "../Cards/Cards";
import style from "./style.module.css"
import { Months } from "../../constants/contants";
import { useEffect, useState } from "react";
import fetchData from "../../utils/http";
import Loader from "../Loader";

function getDiasMes(month, year) {
    month--;

    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
       days.push(date.getDate());
       date.setDate(date.getDate() + 1);
    }
    return days;
}

function criarArrayDeAnos() {
    const anoAtual = new Date().getFullYear();
    const anosPassados = [];
    const anosFuturos = [];
  
    for (let i = 1; i <= 25; i++) {
      anosPassados.push(anoAtual - i);
      anosFuturos.push(anoAtual + i);
    }
  
    const anosCompletos = anosPassados.reverse().concat(anoAtual, anosFuturos);
    return anosCompletos;
  }
  

export default function DashBoard(){
    const [actualMonth, setActualMonth] = useState(new Date().getMonth());
    const [actualYear, setActualYear] = useState(new Date().getFullYear())
    const [daysMonth, setDaysMonth] = useState(getDiasMes(actualMonth + 1, actualYear))
    const [actualDay, setActualDay] = useState(new Date().getDate());
    const [data, setData] = useState(()=> `${actualYear}-${actualMonth < 9 ? "0"+ (actualMonth + 1):actualMonth + 1}-${actualDay <= 9 ? "0"+actualDay:actualDay}`)
    const [matriculados, setMatriculados] = useState([]);
    const themeCtx = useTheme();
    const [loading, setLoading] = useState(false);

    const getMatriculadosOm = async()=>{
        const response = await fetchData('/admin/matriculadosom/'+data);
        setMatriculados(response);
        setLoading(false)
    }

    const handleChangeDay = (day)=>{
        setActualDay(day);
        setLoading(true);
    }
    
    const handleChangeMonth = (month)=>{
        setActualMonth(month)
        setLoading(true);
    }
    
    const getMonth = ()=>{
        return new Date().toLocaleDateString('pt-Br', {month:"short", year:"numeric"})
    }
    
    useEffect(()=>{
        setLoading(false)
    })

    useEffect(()=>{
        setLoading(false)
        setDaysMonth(getDiasMes(actualMonth + 1, actualYear))
        setData(`${actualYear}-${actualMonth < 9 ? "0"+(actualMonth+ 1):actualMonth+ 1  }-${actualDay <= 9 ? "0"+actualDay:actualDay}`)
        getMatriculadosOm()
    },[actualMonth, actualDay, data])
    useEffect(()=>{
        console.log(data);
    },[])
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
                
                <div class="d-flex flex-wrap gap-2">
                <div className="d-block">
                    <BatCard>
                        <span className="fs-6">Matrículas OM</span>
                        <span className="fs-6">{getMonth()}</span>
                        <h1 className={`${style.yellowText} fs-3`}>4</h1>
                    </BatCard>
                </div>
                <div>
                    <div style={{width:"500px", maxWidth:"500px", overflow:"auto", height:"", maxHeight:"500px"}} className="d-block justify-conten-start align-items-start p-2">
                        {
                            <div style={{display:"block", width:"max-content", cursor:"pointer"}} className={`bg-secondary rounded text-center p-2`}>
                                2023
                            </div>
                        }
                        <div style={{overflow:"auto", width:"max-content"}} className="d-flex flex-row gap-1 card p-2">
                            {Months.map((month)=>{
                                if(month.Code <= new Date().getMonth()){
                                    if(month.Code != actualMonth){
                                        return (
                                            <div onClick={()=> handleChangeMonth(month.Code)} style={{display:"block", width:"100px", cursor:"pointer"}} className={`bg-${month.Code == actualMonth ? 'success':'secondary'} rounded text-center p-2`} key={month.Code}>{month.Month}</div>
                                            )
                                        }else{
                                            return (
                                                <div style={{display:"block", width:"100px", cursor:"pointer"}} className={`bg-${month.Code == actualMonth ? 'success':'secondary'} rounded text-center p-2`} key={month.Code}>{month.Month}</div>
                                            )
                                        }
                                    }
                                })}
                        </div>
                        <div style={{overflow:"auto", width:"max-content"}} className="d-flex justify-conten-start align-items-start flex-row gap-2 card p-1">
                        {
                            daysMonth.map((day)=>{
                                if(actualMonth  != new Date().getMonth()){
                                    if(day != actualDay){
                                        return(
                                            <div onClick={()=> handleChangeDay(day)} key={day} style={{display:"block", width:"max-content", cursor:"pointer"}} className={`bg-${day == actualDay ? 'success':''} rounded text-center p-2`}>
                                                {day}   
                                            </div>
                                        )
                                    }else{
                                        return(
                                            <div key={day} style={{display:"block", width:"max-content", cursor:"pointer"}} className={`bg-${day == actualDay ? 'success':''} rounded text-center p-2`}>
                                                {day}   
                                            </div>
                                        )
                                    }
                                }else if(actualMonth == new Date().getMonth() && day <= new Date().getDate()){
                                    if(day != actualDay){

                                        return(
                                            <div onClick={()=> handleChangeDay(day)} key={day} style={{display:"block", width:"max-content", cursor:"pointer"}} className={`bg-${day == actualDay ? 'success':''} rounded text-center p-2`}>
                                            {day}   
                                        </div>
                                    )
                                    }else{
                                        return(
                                            <div key={day} style={{display:"block", width:"max-content", cursor:"pointer"}} className={`bg-${day == actualDay ? 'success':''} rounded text-center p-2`}>
                                            {day}   
                                        </div>
                                    )
                                    }
                                }
                            })
                        }
                        </div>
                    </div>
                    <div style={{maxHeight:"250px", overflow:"auto"}}>
                        {matriculados.length > 0 &&
                            <table className="table table-dark">
                                <thead>
                                    <tr>
                                        <th>Quantidade: {matriculados.length}</th>
                                    </tr>
                                    <tr>
                                        <td>Login</td>
                                        <td>Nome do aluno</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {matriculados.map(matriculado =>{
                                        return (
                                            <tr key={matriculado.key}>
                                                <td>{matriculado.LOGIN}</td>
                                                <td>{matriculado.NOME}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table> 
                        }
                        {loading && <Loader />}
                    </div>
                </div>
                        
                </div>
            </div>
            
        </div>
        </>
    )
}