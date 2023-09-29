import { Link } from "react-router-dom";
import style from "./style.module.css"
export default function BatCard(props){
    return (
        <div className={style.mycard}>
            <Link className={style.navLinkBat} to={`${props.href ? props.href:''}`}>
                <div className={style.orelhas}></div>
                <div className={`${style.orelhas} ${style.right}`}></div>
                <div className={style.myCardBody}>
                <h4 className={style.flexColumn}>
                    {props.children}
                </h4>
                </div>
            </Link>
        </div>
    )
}