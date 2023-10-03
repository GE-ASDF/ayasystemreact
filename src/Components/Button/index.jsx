import style from "./style.module.css"
export default function Button(props){
    return (
        <button {...props} className={`btn ${props.className}`}>
            {props.children}
        </button>
    )
}