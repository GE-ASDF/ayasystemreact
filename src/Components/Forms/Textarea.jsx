import { useController } from "react-hook-form"

const Textarea = (props)=>{
    const {field, fieldState} = useController(props); 
    return (
        <div className="form-group">
            <textarea id={`${field.name}`} placeholder={`${field.name}`} className={`form-control ${fieldState.invalid ? "border border-danger":""}`}></textarea>
            {fieldState.invalid && <p className="alert alert-danger">{fieldState.error.message}</p>}
        </div>
    )
}

export default Textarea;