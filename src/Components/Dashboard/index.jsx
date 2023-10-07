import { useTheme } from "../../Contexts/ThemeContext";
import BatCard from "../BatCard";
import {Card, CardBody, CardHeader} from "../Cards/Cards";
import style from "./style.module.css"
import { Months } from "../../constants/contants";
import { useEffect, useState } from "react";
import fetchData from "../../utils/http";
import Loader from "../Loader";
import Button from "../Button";

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
                    <BatCard>
                        <span className="fs-6">Matrículas OM</span>
                        <span className="fs-6">{getMonth()}</span>
                        <span className={`${style.yellowText} fs-3`}>4</span>
                    </BatCard>
                </div>
                <div>
                    <div style={{width:"500px", maxWidth:"500px", overflow:"auto", height:"", maxHeight:"500px"}} className="d-block text-white justify-conten-start align-items-start p-2">
                        {
                            <Button style={{display:"block", width:"max-content", cursor:"pointer"}} className={`bg-secondary text-white rounded text-center p-2`}>2023</Button>
                        }
                        <div style={{overflow:"auto", width:"max-content"}} className={`d-flex flex-row gap-1 card p-2 ${themeCtx.theme == "dark" ? 'bg-dark text-white':'bg-light text-white'}`}>
                            {Months.map((month)=>{
                                if(month.Code <= new Date().getMonth()){
                                    if(month.Code != actualMonth){
                                        return (
                                            <Button onClick={()=> handleChangeMonth(month.Code)}  className={`bg-${month.Code == actualMonth ? 'success':'secondary'} text-white `} key={month.Code}>{month.Month}</Button>
                                            )
                                        }else{
                                            return (
                                                <Button className={`bg-${month.Code == actualMonth ? 'success':'secondary'} text-white `} key={month.Code}>{month.Month}</Button>
                                            )
                                        }
                                    }
                                })}
                        </div>
                        <div style={{overflow:"auto", width:"max-content"}} className={`d-flex justify-content-start align-items-center flex-row gap-1 card ${themeCtx.theme == "dark" ? 'bg-dark text-white':'bg-light text-white'}`}>
                        {
                            daysMonth.map((day)=>{
                                if(actualMonth  != new Date().getMonth()){
                                    if(day != actualDay){
                                        return(
                                            <Button onClick={()=> handleChangeDay(day)} key={day} className={`bg-${day == actualDay  ? 'success':'secondary'} rounded-circle py-1 text-white `} >{day}</Button>
                                            )
                                        }else{
                                            return(
                                            <Button key={day} className={`bg-${day == actualDay  ? 'success':'secondary'} text-white `} >{day}</Button>
                                        )
                                    }
                                }else if(actualMonth == new Date().getMonth() && day <= new Date().getDate()){
                                    if(day != actualDay){

                                        return(
                                            <div onClick={()=> handleChangeDay(day)} key={day} style={{display:"block", width:"max-content", cursor:"pointer"}} className={`bg-${day == actualDay ? 'success':'secondary'} rounded text-center p-2`}>
                                            {day}   
                                        </div>
                                    )
                                    }else{
                                        return(
                                            <div key={day} style={{display:"block", width:"max-content", cursor:"pointer"}} className={`bg-${day == actualDay ? 'success':'secondary'} rounded text-center p-2`}>
                                            {day}   
                                        </div>
                                    )
                                    }
                                }
                            })
                        }
                        </div>
                    </div>
                    <div style={{maxHeight:"250px",maxWidth:"500px", overflow:"auto"}}>
                        {matriculados.length > 0 &&
                            <table className="table table-dark">
                                <thead>
                                    <tr>
                                        <th>Quantidade: {matriculados.length}</th>
                                    </tr>
                                    <tr>
                                        <td>ID</td>
                                        {/* <td>Login</td> */}
                                        <td>Nome do aluno</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {matriculados.map(matriculado =>{
                                        return (
                                            <tr key={matriculado.ID}>
                                                <td>{matriculado.ID}</td>
                                                {/* <td>{matriculado.LOGIN}</td> */}
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