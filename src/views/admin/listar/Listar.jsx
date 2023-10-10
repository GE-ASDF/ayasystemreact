import { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Actions } from "../../../Components/Agenda/Body";
import { Card, CardBody, CardHeader } from "../../../Components/Cards/Cards";
import { Table, Tbody, Thead } from "../../../Components/Table";
import { useTheme } from "../../../Contexts/ThemeContext";
import style from "./style.module.css";
import fetchData from "../../../utils/http";
import Button from "../../../Components/Button";

export default function Listar(){
    const themeCtx = useTheme();
    const listarData = useLoaderData();
    const [usuarios, setUsuarios] = useState(listarData);
    const [range, setRange] = useState([...Array(usuarios.maxPages).keys()]);
    const [getInfoStudent, setGetInfoStudent] = useState(false)
    const [search, setSearch] = useState('');

    const handleGetInfoStudent = ()=>{
        setGetInfoStudent(!getInfoStudent)
    }
    const handleTypeSearch =async (e)=>{
        setSearch(e.target.value);
        const response = await fetchData("/admin/listar/"+e.target.value);
        setUsuarios(response);        
        setRange([...Array(response.maxPages).keys()])
    }

    const handlePagination = async(page)=>{
        const pesquisa = search ? search:" ";
        const response = await fetchData("/admin/listar/"+pesquisa+"/"+page);
        setUsuarios(response);  
        setRange([...Array(response.maxPages).keys()])
    }

    return (
        <>
            <Card className={`bg-${themeCtx.theme} ${themeCtx.theme == "dark" ? "text-light":"text-dark"} p-1 border m-2`}>
                <h1><i className="bi bi-list-nested"></i> Lista de alunos</h1>
                <CardBody>
                    <div className="d-flex fw-bold fs-2 justify-content-between">
                        <span>
                        {usuarios.allUsers}
                        </span>
                        <i className="bi bi-person"></i>
                    </div>
                    <div className="fw-bold">
                        Total
                    </div>
                </CardBody>
            </Card>
            <Card className={`bg-${themeCtx.theme} p-2 border m-2`}>
                <div className="form-group d-flex justify-content-between align-items-center">
                    <div className="form-group">
                        <p className={`${themeCtx.theme == "dark" ? "text-white":""} fw-bold`}>Registros por página: 10</p>
                        {/* <select defaultValue="10" name="limit" id="" className="form-select">
                            <option value="">Selecione uma opção</option>
                            <option  value="10">10</option>
                            <option  value="100">100</option>
                            <option  value="200">200</option>
                            <option  value="300">300</option>
                            <option  value="400">400</option>
                            <option  value="500">500</option>
                        </select> */}
                    </div>
                    <div className="form-group text-white">
                        <label htmlFor="txtBusca" className="fw-bold">Pesquisa:</label>
                        <input onChange={handleTypeSearch} type="text" placeholder="Digite sua pesquisa" className="form-control"/>
                    </div>
                </div>
                <CardBody>
                    <Table className={`bg-${themeCtx.theme}`}>
                        <Thead head={['Código do aluno','Código do contrato','Nome do aluno', 'Sistema', 'Ações']}/>
                        <Tbody>
                        {usuarios.usuarios.map((usuario)=>{
                            return (
                                <tr key={usuario.NomeAluno + usuario.CodigoContrato + usuario}>
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
                    <CardHeader className={`d-flex gap-1`}>
                        {usuarios.offset > 1 &&
                            <Button onClick={()=> handlePagination(0)} className={`myBtnPrimary`}>
                                Primeira página: 1
                            </Button>
                        }
                        {usuarios.offset > 1 &&
                            <Button onClick={()=> handlePagination(usuarios.offset - 1)} className={`myBtnPrimary`}>
                                {usuarios.offset - 1}
                            </Button>
                        }
                        {usuarios.offset < usuarios.maxPages &&
                            <Button onClick={()=> handlePagination(usuarios.offset + 1)} className={`myBtnPrimary`}>
                                {usuarios.offset + 1}
                            </Button>
                        }
                        {usuarios.offset != usuarios.maxPages && usuarios.maxPages > 0 &&
                            <Button onClick={()=> handlePagination(usuarios.maxPages)} className={`myBtnPrimary`}>
                                Última página: {usuarios.maxPages}
                            </Button>
                        }
                    </CardHeader>
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