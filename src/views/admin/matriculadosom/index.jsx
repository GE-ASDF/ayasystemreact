import { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import { Card, CardHeader } from "../../../Components/Cards/Cards";
import Days from "../../../Components/Days";
import MatriculadosOm from "../../../Components/MatriculadosOm";
import Months from "../../../Components/Months";
import Years from "../../../Components/Years";
import { useTheme } from "../../../Contexts/ThemeContext";
import fetchData from "../../../utils/http";

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

export default function MatriculadosOM(){
    const [actualMonth, setActualMonth] = useState(new Date().getMonth());
    const [actualYear, setActualYear] = useState(new Date().getFullYear())
    const [daysMonth, setDaysMonth] = useState(getDiasMes(actualMonth + 1, actualYear))
    const [actualDay, setActualDay] = useState(new Date().getDate());
    const [data, setData] = useState(()=> `${actualYear}-${actualMonth < 9 ? "0"+ (actualMonth + 1):actualMonth + 1}-${actualDay <= 9 ? "0"+actualDay:actualDay}`)
    const [matriculados, setMatriculados] = useState([]);
    const [loading, setLoading] = useState(false);
    const themeCtx = useTheme();

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
    const handleChangeYear = (year)=>{
        setActualYear(year)
        setLoading(true);
    }
    
    useEffect(()=>{
        setLoading(false)
    })

    useEffect(()=>{
        setLoading(false)
        setDaysMonth(getDiasMes(actualMonth + 1, actualYear))
        setData(`${actualYear}-${actualMonth < 9 ? "0"+(actualMonth+ 1):actualMonth+ 1  }-${actualDay <= 9 ? "0"+actualDay:actualDay}`)
        getMatriculadosOm()
    },[actualMonth, actualDay, data, actualYear])

    return(
        <Card className={`bg-${themeCtx.theme == "dark" ? "dark text-white":""}`}>
            <CardHeader>
                <h1>Matriculados OM</h1>
            </CardHeader>
            <div style={{overflow:"auto"}} className="d-block flex-wrap text-white justify-conten-start align-items-start p-2">
                <Years onClick={handleChangeYear} actualYear={actualYear} />
                <Months actualMonth={actualMonth} onClick={handleChangeMonth} />
                <Days daysMonth={daysMonth} actualDay={actualDay} onClick={handleChangeDay} actualMonth={actualMonth}  />                    
            </div>
                <MatriculadosOm loading={loading} matriculados={matriculados} />
        </Card>
    )
}