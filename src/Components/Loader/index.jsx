import style from "./style.module.css";

export default function Loader(props){
    return (
        <div {...props} className={`${style.Cloader} ${props.className}`}>
            <div className={`${style.loader}`}></div>
        </div>
    )
}