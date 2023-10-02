import { Link } from "react-router-dom";
import style from "./style.module.css";
import { Card, CardBody, CardHeader } from "../Cards/Cards";
import { useTheme } from "../../Contexts/ThemeContext";
import Button from "../Button";

export const Header = ({onClick, onChange, btnActive})=>{
    const themeCtx = useTheme();

    return (
        <Card className={`mt-3 ${themeCtx?.theme == "dark" ? "bg-dark border text-light":"bg-light"}`}>
            <CardHeader>
                <Link className={`btn btn-light ${style.myBtnPrimary} rounded-circle btn-sm`} to="/admin"><i className="bi text-white bi-arrow-left-circle"></i></Link>
            </CardHeader>
            <CardBody>
                <div className="card-title">
                    <h3>Esta é a agenda semanal</h3>
                    <div className={`${style.myBtnPrimary} ${style.detail} p-1`}></div>
                    <div className="d-grid mt-2">
                        <div className="row">
                        <div className="col-lg-6 p-1 col-sm-6 form-group d-flex justify-content-center align-items-center">
                            <span className="p-1 d-flex justify-content-center align-items-center h-100 rounded">Agenda de:</span>
                            <select onChange={onChange} name="" className={`form-select w-50 p-1`} id="">
                                <option value="1">Segunda-feira</option>
                                <option value="2">Terça-feira</option>
                                <option value="3">Quarta-feira</option>
                                <option value="4">Quinta-feira</option>
                                <option value="5">Sexta-feira</option>
                                <option value="6">Sábado</option>
                                <option value="7">Domingo</option>
                            </select>
                        </div>
                        <div className="col-lg-6 p-1 d-flex align-items-center col-sm-6 form-group">
                            <h5 className={`fs-6 `}>Sistema</h5>
                            <Button onClick={onClick} id="all" className={`btn btn-sm mx-1     ${themeCtx?.theme == "dark" ? "text-light":""}  ${btnActive.btn == 'all' ?         style.myBtnPrimary:""}`}>Todos</Button>
                            <Button onClick={onClick} id="prepara" className={`btn btn-sm mx-1 ${themeCtx?.theme == "dark" ? "text-light":""}  ${btnActive.btn == 'prepara' ?  style.myBtnPrimary:""}`}>Prepara</Button>
                            <Button onClick={onClick} id="ouro" className={`btn btn-sm mx-1    ${themeCtx?.theme == "dark" ? "text-light":""} ${btnActive.btn == 'ouro' ?      style.myBtnPrimary:""}`}>Ouro</Button>
                        </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

