import { useController } from "react-hook-form"

const Input = (props)=>{
    const {field, fieldState} = useController(props); 
    return (
        <div className="form-group">
            <label className={`fw-bold`} htmlFor={`${field.name}`}>{field.name}</label>
            <input type={`${props.type}`}  {...field} id={`${field.name}`} placeholder={`${field.name}`}  className={`form-control ${fieldState.invalid ? "border border-danger":""}`}/>
            {fieldState.invalid && <p className="alert alert-danger">{fieldState.error.message}</p>}
        </div>
    )
}

export default Input;