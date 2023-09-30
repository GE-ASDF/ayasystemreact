import { useTheme } from "../../Contexts/ThemeContext";

export const Card = (props)=>{
    return (
        <div {...props} className={`${props.className} card w-100`}>
            {props.children}
        </div>
    )
}

export const CardHeader = (props)=>{

    return (
        <div {...props} className={`${props.className} card-header`}>
                {props.children}
        </div>
    )
}

export const CardBody = (props)=>{

    return (
        <div {...props} className={`${props.className} card-body`}>
                {props.children}
        </div>
    )
}