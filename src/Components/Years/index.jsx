import { useTheme } from "../../Contexts/ThemeContext";
import Button from "../Button";

export default function Years({onClick, actualYear}){
    const themeCtx = useTheme();
    const baseYear = 2017;
    const years = [...Array(500).keys()].map(key =>{
        return baseYear + key;
    })

    return (
        <div style={{overflow:"auto", width:"max-content"}} className={`d-flex flex-row gap-1 card p-2 ${themeCtx.theme == "dark" ? 'bg-dark text-white':'bg-light text-white'}`}>
            {years.map(year =>{
                if(year <= new Date().getFullYear()){
                    return(
                        <Button onClick={()=>onClick(year)} key={year} style={{display:"block", width:"max-content", cursor:"pointer"}} className={`bg-${actualYear == year ? 'success':'secondary'} text-white rounded text-center p-2`}>{year}</Button>
                    )
                }
            })}
        </div>
    )
}