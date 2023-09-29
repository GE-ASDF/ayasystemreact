import style from "./style.module.css"
export default function HamburguerMenu(props){
    return (
        <span onClick={props.onClick} className={`${style.menuMobile} ${props.className}`}>
            <div className={`${style.traco}` }></div>
            <div className={`${style.traco} ${style.tracoMenor}`}></div>
            <div className={`${style.traco}`}></div>
        </span>
    )
}