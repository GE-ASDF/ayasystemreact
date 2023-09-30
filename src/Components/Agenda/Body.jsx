import { useState } from "react";
import style from "./style.module.css";
import { Card, CardBody, CardHeader } from "../Cards/Cards";
import { Accordion } from "../Accordion/Accordion";
import { useTheme } from "../../Contexts/ThemeContext";
export const Body = ()=>{
    const [showMetadata, setShowMetadata] = useState(false);
    const themeCtx = useTheme();
    return (
        <div className={`card mt-2 p-2 ${themeCtx?.theme == 'dark' ? `bg-dark border text-light`:"bg-light"}`}>
            <div className="px-3">
                <button onClick={()=> setShowMetadata(!showMetadata)} className={`btn p-0 p-1 btn-sm ${style.myBtnPrimary} ${themeCtx?.theme == "dark" ? "text-light":""}`}>Mostrar informações</button>
                {showMetadata && 
                <div className="d-flex justify-content-between align-items-between gap-2 mt-2 w-100">
                    <Card className={`mt-2 ${themeCtx?.theme == "dark" ? "bg-dark border text-light":"bg-light"}`}>
                            <CardHeader className={`bg-success text-white`}> 
                                <h6>Presentes</h6>
                            </CardHeader>
                            <CardBody className={`fs-4 d-flex justify-content-between`}>
                                <div>10</div>
                                <div><i className={`${style.iconsPurple} bi bi-person-raised-hand`}></i></div>
                            </CardBody>
                        </Card>
                        <Card className={`mt-2 ${themeCtx?.theme == "dark" ? "bg-dark border text-light":"bg-light"}`}>
                            <CardHeader className={`bg-danger text-white`}> 
                                <h6>Faltosos</h6>
                            </CardHeader>
                            <CardBody className={`fs-4 d-flex justify-content-between`}>
                                <div>10</div>
                                <div><i className={`${style.iconsPurple} bi bi-x-circle-fill`}></i></div>
                            </CardBody>
                        </Card>
                        <Card className={`mt-2 ${themeCtx?.theme == "dark" ? "bg-dark border text-light":"bg-light"}`}>
                            <CardHeader className={`bg-warning text-white`}> 
                                <h6>EaD</h6>
                            </CardHeader>
                            <CardBody className={`fs-4 d-flex justify-content-between`}>
                                <div>10</div>
                                <div><i className={`${style.iconsPurple} bi bi-bookmark-fill`}></i></div>
                            </CardBody>
                        </Card>
                    </div>
                    }
                </div>
            <Card className={`mt-2 border-0 ${themeCtx?.theme == "dark" ? "bg-dark text-light":"bg-light"}`}>
            <CardBody style={{overflowX:"auto"}} className={`${themeCtx?.theme == "dark" ? "bg-dark text-light":"bg-light"}`}>
                <Accordion accordionHeaderClasses={`${themeCtx?.theme == "dark" ? "bg-dark text-light":"bg-light"}`} style={{maxWidth:"100%"}} accordionItemClasses={`${themeCtx?.theme == "dark" ? "bg-dark text-light":"bg-light"}`} accordionClasses={`${themeCtx?.theme == "dark" ? "bg-dark border text-light":"bg-light"}`} idAccordion="teste" accordionButtonClasses={`${style.myBgPrimary}`} accordionButtonText="Teste" dataBsTarget="collapseTeste" >
                    <div style={{overflowX:"auto"}} className={`mt-2 card p-1 ${themeCtx?.theme == "dark" ? "bg-dark text-light":"bg-light"}`}>
                    <table className="table table-bordered table-sm table-dark">
                        <thead>
                            <tr>
                                <th>Código do contrato</th>
                                <th>Nome do aluno</th>
                                <th>Matéria atual</th>
                                <th>Sistema </th>
                                <th>Computador</th>
                                <th>Histórico</th>
                                <th>Situação</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                    </table>
                    </div>
                </Accordion>
            </CardBody>
        </Card>
        </div>
    )
}