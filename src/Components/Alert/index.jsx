import Button from "../Button"

const Alert = (props)=>{
    return (
        <div style={{position:"absolute", top:"10px", left:"10px"}} className={`alert alert-${props.type}`}>
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