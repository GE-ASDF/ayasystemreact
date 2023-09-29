import { useState } from "react";
import style from "./style.module.css";
import { Card, CardBody, CardHeader } from "../Cards/Cards";
import { Accordion } from "../Accordion/Accordion";
export const Body = ()=>{
    const [showMetadata, setShowMetadata] = useState(false);

    return (
        <div className={`card mt-2 p-2`}>
            <div className="px-3">
                <button onClick={()=> setShowMetadata(!showMetadata)} className={`btn p-0 p-1 btn-sm ${style.myBtnPrimary}`}>Mostrar informações</button>
                {showMetadata && 
                <div className="d-flex justify-content-between align-items-between gap-2 mt-2 w-100">
                    <Card className={`mt-2`}>
                            <CardHeader className={`bg-success text-white`}> 
                                <h6>Presentes</h6>
                            </CardHeader>
                            <CardBody className={`fs-4 d-flex justify-content-between`}>
                                <div>10</div>
                                <div><i className={`${style.iconsPurple} bi bi-person-raised-hand`}></i></div>
                            </CardBody>
                        </Card>
                        <Card className={`mt-2`}>
                            <CardHeader className={`bg-danger text-white`}> 
                                <h6>Faltosos</h6>
                            </CardHeader>
                            <CardBody className={`fs-4 d-flex justify-content-between`}>
                                <div>10</div>
                                <div><i className={`${style.iconsPurple} bi bi-x-circle-fill`}></i></div>
                            </CardBody>
                        </Card>
                        <Card className={`mt-2`}>
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
            <Card className={`mt-2 border-0`}>
            <CardBody style={{overflowX:"auto"}}>
                <Accordion style={{maxWidth:"100%"}} idAccordion="teste" accordionButtonClasses={`${style.myBgPrimary}`} accordionButtonText="Teste" dataBsTarget="collapseTeste" >
                    <div style={{overflowX:"auto"}} className="mt-2 card p-1">
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