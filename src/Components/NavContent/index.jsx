import { Link, useNavigate } from "react-router-dom";
import hookGetDateTime from "../../Hooks/hookGetDateTime";
import style from "./style.module.css"
import Button from "../Button";
import { useTemplate } from "../../Contexts/TemplateContext";
import { useState } from "react";
import { useEffect } from "react";
import fetchData from "../../utils/http";
import { useAlert } from "../../Contexts/AlertContext";
import Loader from "../Loader";
import Modal from "../Modal";
import { useTheme } from "../../Contexts/ThemeContext";
import {normalizeString} from "../../utils/normalizeString";
import Cookies from "js-cookie"
import { useAuth } from "../../Contexts/AuthContext";

export default function NavContent(props){
    const {setLogged} = useAuth();
    const themeCtx = useTheme();
    const {alert, setAlert} = useAlert();
    const [gradeFlex, setGradeFlex] = useState([]);
    const [loading, setLoading] = useState(false);
    const [time] = hookGetDateTime()
    const {dataUser} = useTemplate();
    const data = JSON.parse(dataUser)
    const navigate = useNavigate();

    const handleLogout = (e)=>{
        e.preventDefault();
        localStorage.removeItem("logado");
        sessionStorage.removeItem("logado")
        Cookies.remove("token");
        setLogged(Cookies.get("token"))
        // navigate("/login")
    }

    const [btnActive, setBtnActive] = useState({
        btn:'all',
        active:true,
    });
    const [sistema, setSistema] = useState('all')

    const handleChangeSystemBtn = (e)=>{
        setBtnActive({btn: e.target.id, active: true})
        setSistema(e.target.id);
    }
    const getGradeFlex = async ()=>{
        setLoading(true);
        const grade = await fetchData("/admin/gradeflex");
   
        if(grade.error){
            setAlert({type:'danger', message:"Não foi possível obter a grade flex.", show:true, time:7})
            return;
        }else{
            setGradeFlex(grade);
        }
    }
    useEffect(()=>{
        setLoading(false);
    },[gradeFlex,sistema, alert])

    return (
        <>
        <nav className={style.navMain}>
            <div className={style.containerLinks}>
            <div className={style.navContent}>
                <div className={style.navLogo}>
                    <img src="/img/logo.png" alt="" />
                </div>
                <div className={`${style.navGreeting}`}>
                    <h4 className="fs-6">Bem vindo(a), {data.Nome}</h4>
                    <h5 className="fs-6">{time}</h5>
                </div>
            </div>
            <ul className={`navbar ${style.navLinks}`}>
                <li className={`${style.navLinkItem} nav-item w-100`}>
                    <Link className="nav-item" to="/admin"><i className="bi bi-house-door"></i> Início</Link>
                </li>
                <li className={`${style.navLinkItem} nav-item w-100`}>
                    <Button data-bs-toggle="modal" data-bs-target="#gradeflex" onClick={getGradeFlex} className={`${style.backTransparent}`}><i className="bi bi-stopwatch"></i> Grade flex</Button>
                </li>
                <li className={`${style.navLinkItem} nav-item w-100`}>
                    <Link className="nav-item" to="/admin/listar"><i className="bi bi-list-nested"></i> Listar</Link>
                </li>
            </ul>
            </div>
                <Link className={`${style.navLinkItem} ${style.logout}`} onClick={handleLogout}><i className="bi bi-box-arrow-right"></i></Link>
        </nav>
        <Modal className={`${themeCtx?.theme == 'dark' ? `bg-dark text-light`:"bg-light text-dark"}`} modalSize="modal-fullscreen" modalTitle={`Grade flex ${sistema != 'all' ?  sistema.charAt(0).toUpperCase() + sistema.slice(1):''}`} id="gradeflex">
            <div className="col-lg-6 p-1 d-flex align-items-center col-sm-6 form-group">
                <h5 className={`fs-6 `}>Sistema</h5>
                <Button onClick={handleChangeSystemBtn} id="all" className={`btn btn-sm mx-1     ${themeCtx?.theme == "dark" ? "text-light":""}  ${btnActive.btn == 'all' ?         style.myBtnPrimary:""}`}>Todos</Button>
                <Button onClick={handleChangeSystemBtn} id="prepara" className={`btn btn-sm mx-1 ${themeCtx?.theme == "dark" ? "text-light":""}  ${btnActive.btn == 'prepara' ?  style.myBtnPrimary:""}`}>Prepara</Button>
                <Button onClick={handleChangeSystemBtn} id="ouro" className={`btn btn-sm mx-1    ${themeCtx?.theme == "dark" ? "text-light":""} ${btnActive.btn == 'ouro' ?      style.myBtnPrimary:""}`}>Ouro</Button>
            </div>
            {loading && <Loader />}
            {!loading &&
                <table className={`table table-${themeCtx.theme}`}>
                    <thead >
                        <tr>
                            <th className="text-center">Hora início</th>
                            <th className="text-center">Segunda-feira</th>
                            <th className="text-center">Terça-feira</th>
                            <th className="text-center">Quarta-feira</th>
                            <th className="text-center">Quinta-feira</th>
                            <th className="text-center">Sexta-feira</th>
                            <th className="text-center">Sábado</th>
                            <th className="text-center">Domingo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gradeFlex.map((grade, key)=>{
                            return(
                                <tr key={key}>
                                    <td className="text-center">{grade.HoraInicio}</td>
                                    {grade.Alunos.map(aluno =>{
                                            return (
                                            <>
                                                <td className={`${20 - aluno.Alunos.length > 0 ? "bg-success":"bg-danger"}`} key={aluno.DiaDaSemana}>
                                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                                        <span className="fw-bold">
                                                            Vagas:{sistema == 'all' && 20 - aluno.Alunos.length}
                                                            {sistema == 'ouro' && <span>{5 - aluno.Alunos.filter(al => al.tipoAluno.trim().toLowerCase() == 'ouro').length}</span>}
                                                            {sistema == 'prepara' && <span>{20 - aluno.Alunos.filter(al => al.tipoAluno.trim().toLowerCase() == 'prepara').length}</span>}
                                                        </span>
                                                        <span className="fw-bold">
                                                            Ocup.:{sistema == 'all' && <span>{aluno.Alunos.length}/20</span>}
                                                            {sistema == 'ouro' && <span>{aluno.Alunos.filter(al => al.tipoAluno.trim().toLowerCase() == 'ouro').length}/5</span>}
                                                            {sistema == 'prepara' && <span>{aluno.Alunos.filter(al => al.tipoAluno.trim().toLowerCase() == 'prepara').length}/20</span>}
                                                            
                                                        </span>
                                                    </div>
                                                </td>
                                            </>
                                            )
                                        })
                                    }                            
                                </tr>
                            ) 
                        })}
                    </tbody>
                </table>
            }
        </Modal>
        </>
    )
}