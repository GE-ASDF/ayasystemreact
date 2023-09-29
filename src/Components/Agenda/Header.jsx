import { Link } from "react-router-dom";
import style from "./style.module.css";
import { Card, CardBody, CardHeader } from "../Cards/Cards";

export const Header = ({onClick, btnActive})=>{
    

    return (
        <Card className={`mt-3`}>
            <CardHeader>
                <Link className={`btn btn-light ${style.myBtnPrimary} rounded-circle btn-sm`} to="/admin"><i class="bi text-white bi-arrow-left-circle"></i></Link>
            </CardHeader>
            <CardBody>
                <div className="card-title">
                    <h3>Esta é a agenda semanal</h3>
                    <div className={`${style.myBtnPrimary} ${style.detail} p-1`}></div>
                    <div className="d-grid mt-2">
                        <div className="row">
                        <div className="col-lg-6 col-sm-6 form-group d-flex justify-content-center align-items-center">
                            <span className="p-1 d-flex justify-content-center align-items-center h-100 rounded">Agenda de:</span>
                            <select name="" className={`form-select w-50 p-1`} id="">
                                <option value="1">Segunda-feira</option>
                                <option value="2">Terça-feira</option>
                                <option value="3">Quarta-feira</option>
                                <option value="4">Quinta-feira</option>
                                <option value="5">Sexta-feira</option>
                                <option value="6">Sábado</option>
                                <option value="7">Domingo</option>
                            </select>
                        </div>
                        <div className="col-lg-6 d-flex align-items-center col-sm-6 form-group">
                            <h5 className={`fs-6`}>Sistema</h5>
                            <button onClick={onClick} id="all" className={`btn btn-sm mx-1   ${btnActive.btn == 'all' ?  style.myBtnPrimary:""}`}>Todos</button>
                            <button onClick={onClick} id="prepara" className={`btn btn-sm mx-1 ${btnActive.btn == 'prepara' ?  style.myBtnPrimary:""}`}>Prepara</button>
                            <button onClick={onClick} id="ouro" className={`btn btn-sm mx-1    ${btnActive.btn == 'ouro' ?  style.myBtnPrimary:""}`}>Ouro</button>
                        </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

