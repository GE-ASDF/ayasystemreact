import { Link, useNavigate } from "react-router-dom";
import hookGetDateTime from "../../Hooks/hookGetDateTime";
import style from "./style.module.css"
import Button from "../Button";
import { useTemplate } from "../../Contexts/TemplateContext";



export default function NavContent(props){
    const [time] = hookGetDateTime()
    const {data} = useTemplate();
    const navigate = useNavigate();
    const handleLogout = (e)=>{
        e.preventDefault();
        localStorage.removeItem("logado");
        sessionStorage.removeItem("logado")
        navigate("/login")
    }
    
    return (
        <nav className={style.navMain}>
            <div className={style.containerLinks}>
            <div className={style.navContent}>
                <div className={style.navLogo}>
                    <img src="/img/logo.png" alt="" />
                </div>
                <div className={`${style.navGreeting}`}>
                    <h4 className="fs-6">Bem vindo(a)</h4>
                    <h5 className="fs-6">{time}</h5>
                </div>
            </div>
            <ul className={`navbar ${style.navLinks}`}>
                <li className={`${style.navLinkItem} nav-item w-100`}>
                    <Link className="nav-item" to="/admin"><i className="bi bi-house-door"></i> Início</Link>
                </li>
                <li className={`${style.navLinkItem} nav-item w-100`}>
                    <Button className={`${style.backTransparent}`}><i className="bi bi-stopwatch"></i> Grade flex</Button>
                </li>
            </ul>
            </div>
                <Link className={`${style.navLinkItem} ${style.logout}`} onClick={handleLogout}><i className="bi bi-box-arrow-right"></i></Link>
        </nav>
    )
}