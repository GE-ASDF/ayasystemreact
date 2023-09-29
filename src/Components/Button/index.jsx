import style from "./style.module.css"
export default function Button(props){
    return (
        <button {...props} className={`${style.btn} ${props.className}`}>
            {props.children}
        </button>
    )
}