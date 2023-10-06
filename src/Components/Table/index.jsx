import { useTheme } from "../../Contexts/ThemeContext"

export function Table(props){
    const themeCtx = useTheme();
  
    return(
        <table {...props} className={`table table-${themeCtx?.theme} ${props.className}`}>
            {props.children}
        </table>
    )
}

export function Thead({head = []}){
    const themeCtx = useTheme();
    return (
        <thead>
            <tr className="text-center">
                {head.map((head)=>{
                    return (
                        <th className={`mybg-primary text-white`}>{head}</th>
                    )
                })}
            </tr>
        </thead>
    )
}

export function Tbody(props){
    return (
        <tbody>
            {props.children}
        </tbody>
    )
}

