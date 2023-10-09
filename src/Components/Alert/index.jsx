import style from "./style.module.css"
import Button from "../Button"

const Alert = (props)=>{
    return (
        <div className={`alert ${props.className} ${style.myAlert} alert-${props.type}`}>
            <div className="d-flex justify-content-between gap-3 align-items-center">
                <span>{props.message}</span>
                <Button className="btn btn-danger" onClick={props.onClick}>
                    X
                </Button>
            </div>
        </div>
    )
}


export default Alert;