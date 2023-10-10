import { useTheme } from "../../Contexts/ThemeContext"
import Button from "../Button"

export default function Months({actualMonth, onClick}){
    const themeCtx = useTheme();
    const months = [...Array(12).keys()].map((key)=> new Date(1,key,1).toLocaleString('pt-BR',{month:"long"}))

    return (
        <div style={{overflow:"auto", width:"max-content"}} className={`d-flex flex-row gap-1 card p-2 ${themeCtx.theme == "dark" ? 'bg-dark text-white':'bg-light text-white'}`}>
            {months.map((month, key)=>{
                if(key <= new Date().getMonth()){
                    if(key != actualMonth){
                        return (
                            <Button onClick={()=> onClick(key)}  className={`bg-${key == actualMonth ? 'success':'secondary'} text-white `} key={key}>{month}</Button>
                            )
                        }else{
                            return (
                                <Button className={`bg-${key == actualMonth ? 'success':'secondary'} text-white `} key={key}>{month}</Button>
                            )
                        }
                    }
                })}
        </div>
    )
}