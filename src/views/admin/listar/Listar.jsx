import { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Actions } from "../../../Components/Agenda/Body";
import { Card, CardBody } from "../../../Components/Cards/Cards";
import { Table, Tbody, Thead } from "../../../Components/Table";
import { useTheme } from "../../../Contexts/ThemeContext";
import style from "./style.module.css";

export default function Listar(){
    const themeCtx = useTheme();
    const listarData = useLoaderData();
    const [getInfoStudent, setGetInfoStudent] = useState(false)

    const handleGetInfoStudent = ()=>{
        setGetInfoStudent(!getInfoStudent)
    }

    return (
        <>
            <Card className={`bg-${themeCtx.theme} ${themeCtx.theme == "dark" ? "text-light":"text-dark"} p-1 border m-2`}>
                <h1><i className="bi bi-list-nested"></i> Lista de alunos</h1>
                <CardBody className={``}>
                    
                </CardBody>
            </Card>
            <Card className={`bg-${themeCtx.theme} p-1 border m-2`}>
                <div className="form-group text-white">
                    <label htmlFor="txtBusca">Pesquisa:</label>
                    <input type="text" placeholder="Digite sua pesquisa" className="form-control"/>
                </div>
                <CardBody>
                    <Table className={`bg-${themeCtx.theme}`}>
                        <Thead head={['Código do aluno','Código do contrato','Nome do aluno', 'Sistema', 'Ações']}/>
                        <Tbody>
                        {listarData.usuarios.map((usuario)=>{
                            return (
                                <tr key={usuario.CodigoContrato}>
                                    <td>{usuario.CodigoAluno}</td>
                                    <td>{usuario.CodigoContrato}</td>
                                    <td>{usuario.NomeAluno}</td>
                                    <td>{usuario.tipoAluno}</td>
                                    <td>
                                        <Actions CodigoContrato={usuario.CodigoContrato} handleGetInfoStudent={handleGetInfoStudent} />
                                    </td>
                                </tr>
                            )
                        })}
                        </Tbody>
                    </Table>
                    
                </CardBody>
            </Card>
            {getInfoStudent &&
            <div className={`${style.rightSide} close`}>
                <div className={`${style.dialog}`}>
                    <Outlet context={[handleGetInfoStudent]} />
                </div>
            </div>
            }
        </>
    )
}