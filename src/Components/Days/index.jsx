import { useTheme } from "../../Contexts/ThemeContext"
import Button from "../Button";


export default function Days({daysMonth, actualMonth, actualDay, onClick}){

    const themeCtx = useTheme();
    return(
        <div style={{overflow:"auto", maxWidth:"max-content"}} className={`d-flex flex-wrap justify-content-start align-items-center flex-row gap-1 card ${themeCtx.theme == "dark" ? 'bg-dark text-white':'bg-light text-white'}`}>
            {
                daysMonth.map((day)=>{
                    if(actualMonth  != new Date().getMonth()){
                        if(day != actualDay){
                            return(
                                <Button onClick={()=> onClick(day)} key={day} className={`bg-${day == actualDay  ? 'success':'secondary'} rounded-circle py-1 text-white `} >{day}</Button>
                                )
                            }else{
                                return(
                                <Button key={day} className={`bg-${day == actualDay  ? 'success':'secondary'} text-white `} >{day}</Button>
                            )
                        }
                    }else if(actualMonth == new Date().getMonth() && day <= new Date().getDate()){
                        if(day != actualDay){
                            return(
                                <Button onClick={()=> onClick(day)} key={day} className={`bg-${day == actualDay  ? 'success':'secondary'} rounded-circle py-1 text-white `} >{day}</Button>
                            )
                        }else{
                            return(
                                <Button key={day} className={`bg-${day == actualDay  ? 'success':'secondary'} text-white `} >{day}</Button>
                            )
                        }
                    }
                })
            }
            </div>
    )
}