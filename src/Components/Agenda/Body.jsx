import { useState } from "react";
import style from "./style.module.css";
import { Card, CardBody, CardHeader } from "../Cards/Cards";
import { Accordion } from "../Accordion/Accordion";
import { useTheme } from "../../Contexts/ThemeContext";
export const Body = ({agenda})=>{
    const metadata = agenda[0].Metadata;
    const data = agenda[0].Data;
    const keysMetadata = [...Object.keys(metadata)];

    const [showMetadata, setShowMetadata] = useState(false);
    const themeCtx = useTheme();
    return (
        <div className={`card mt-2 p-2 ${themeCtx?.theme == 'dark' ? `bg-dark border text-light`:"bg-light"}`}>
            <div className="px-3">
                <button onClick={()=> setShowMetadata(!showMetadata)} className={`btn p-0 p-1 btn-sm ${style.myBtnPrimary} ${themeCtx?.theme == "dark" ? "text-light":""}`}>Mostrar informações</button>
                {showMetadata && 
                <div className="d-flex justify-content-between align-items-between gap-2 mt-2 w-100">
                        {keysMetadata.map((key) =>{
                        return (
                            <>
                                <Card className={`mt-2 ${themeCtx?.theme == "dark" ? "bg-dark border text-light":"bg-light"}`}>
                                    <CardHeader className={`bg-${key.trim().toLowerCase() == 'presentes' ? 'success':key.trim().toLowerCase() == 'faltosos' ? 'danger':'warning'} text-white`}> 
                                        <h6>{key}</h6>
                                    </CardHeader>
                                    <CardBody className={`fs-4 d-flex justify-content-between`}>
                                        <div>{metadata[key]}</div>
                                        {key.trim().toLowerCase() == 'presentes' &&<div><i className={`${style.iconsPurple} bi bi-person-raised-hand`}></i></div>}
                                        {key.trim().toLowerCase() == 'faltosos'  &&<div><i className={`${style.iconsPurple} bi bi-x-circle-fill`}></i></div>}
                                        {key.trim().toLowerCase() == 'ead'       &&<div><i className={`${style.iconsPurple} bi bi-bookmark-fill`}></i></div>}
                                    </CardBody>
                                </Card>
                            </>
                        )
                        })}
                    </div>
                    }
                </div>
            <Card className={`mt-2 border-0 ${themeCtx?.theme == "dark" ? "bg-dark text-light":"bg-light"}`}>
            <CardBody style={{overflowX:"auto"}} className={`${themeCtx?.theme == "dark" ? "bg-dark text-light":"bg-light"}`}>
                {data.map((value, key) =>{
                    return (
                        <>
                        <Accordion accordionHeaderClasses={`${themeCtx?.theme == "dark" ? "bg-dark text-light":"bg-light"}`} style={{maxWidth:"100%"}} 
                        accordionItemClasses={`${themeCtx?.theme == "dark" ? "bg-dark text-light":"bg-light"}`} accordionClasses={`${themeCtx?.theme == "dark" ? "bg-dark text-light":"bg-light"}`} idAccordion={`agenda`} 
                        accordionButtonClasses={`${style.myBgPrimary} fw-bold`} 
                        accordionButtonText={`${value.HoraInicio} - Qtd. ${value.Alunos.length}`} dataBsTarget={`n${key}`} >
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
                            <tbody>
                                {value.Alunos.map(aluno =>
                                    (
                                        <>
                                            <tr>
                                                <td className="text-center">{aluno.CodigoContrato}</td>
                                                <td>{aluno.NomeAluno}</td>
                                                <td className="text-center">{aluno.MateriaAtual}</td>
                                                <td className="text-center">{aluno.tipoAluno}</td>
                                                <td className="text-center">{aluno.Computador}</td>
                                                <td className="text-center">{aluno.Historico}</td>
                                                <td className={`text-center 
                                                bg-${aluno.Presente.trim().toLowerCase() == 'p' ? 'success':
                                                aluno.Presente.trim().toLowerCase() == 'f' ? 'danger':'warning'
                                                }`
                                                }>{aluno.Presente}</td>
                                            </tr>
                                        </>
                                    )
                                )}
                            </tbody>
                        </table>
                        </div>
                    </Accordion>
                    </>
                    )
                })}

            </CardBody>
        </Card>
        </div>
    )
}