import { Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader } from "../../../Components/Cards/Cards";
import { useTheme } from "../../../Contexts/ThemeContext";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import { Actions, TbodyWithSearch } from "../../../Components/Agenda/Body";
import { Table, Tbody, Thead } from "../../../Components/Table";
import { Accordion } from "../../../Components/Accordion/Accordion";
import fetchData from "../../../utils/http";
import {normalizeString} from "../../../utils/normalizeString";
import Loader from "../../../Components/Loader";
import {formatDateToBD, formatDateToUser} from "../../../utils/formatDateBD";
export default function Presencas(){
    const themeCtx = useTheme();
    const [datasPresencas, setDatasPresencas] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const presencas = useLoaderData();
    const [search, setSearch] = useState(null);
    const head = ['Código do contrato', 'Nome do aluno','Computador','IpComputador  ','Ações']
    const [DataPresenca, setDataPresenca] = useState(new Date().toLocaleDateString("pt-br"))
    const [getInfoStudent, setGetInfoStudent] = useState(false)
    const navigate = useNavigate();
    
    const handleChangeData = (e)=>{
        setIsLoading(true);
        const dataPresenca = formatDateToBD(e.target.value);
        setDataPresenca(formatDateToUser(dataPresenca))
        navigate(`/admin/presencas/${dataPresenca}`)
    }
    useEffect(()=>{
        const getDatasPresencas = async ()=>{
            setIsLoading(true)
            const datas = await fetchData('/admin/dataspresencas');
            if(!datas.error){
                setDatasPresencas(datas);
            }
        }
        getDatasPresencas();
        setIsLoading(false);
    },[datasPresencas,loading])

    const handleGetInfoStudent = ()=>{
        setGetInfoStudent(!getInfoStudent)
    }

    const handleSearch = (e)=>{
        setSearch(e.target.value.trim().normalize("NFD").toLowerCase())
    }
    
    return (
        <div className="d-flex flex-column flex-wrap">
        {loading && <Loader />}
        <Card className={`mt-3 ${themeCtx?.theme == "dark" ? "bg-dark border text-light":"bg-light"}`}>
            <CardHeader>
                <Link className={`btn btn-light ${style.myBtnPrimary} rounded-circle btn-sm`} to="/admin"><i className="bi text-white bi-arrow-left-circle"></i></Link>
            </CardHeader>
            <CardBody>
                <div className="card-title">
                    <h3>Presenças de {DataPresenca}</h3>
                    <div className={`${style.myBtnPrimary} ${style.detail} p-1`}></div>
                    <div className="d-flex flex-column mt-2">
                        <select onChange={handleChangeData} className={`form-select`} name="" id="">
                            {loading && <Loader />}
                            {datasPresencas.map(data => 
                                <option selected={`${data == DataPresenca ? "selected":""}`} value={`${data}`}>Data da presença: {data}</option>    
                            )}
                        </select>
                    </div>
                </div>
            </CardBody>
        </Card>
        <Card className={`mt-2 border-0 ${themeCtx?.theme == "dark" ? "bg-dark text-light":"bg-light"}`}>
                <div>

                <div className="px-3 gap-3 justify-content-end d-flex align-items-center">
                    <div>
                        <span>Pesquisar</span>
                    </div>
                    <div style={{minWidth:"125px"}}>
                        <input onChange={handleSearch} autoFocus="autofocus" type="text" className="form-control " placeholder="Pesquisar" />
                    </div>
                </div>
                {search &&
                    <div style={{overflowX:"auto"}} className="px-3 mt-2">
                        <Table className="table">
                            <Thead head={head} />
                            <Tbody>
                                {presencas.map((presenca)=>{
                                    return presenca.Alunos.map((aluno)=>{
                                        if(normalizeString(aluno.NomeAluno).includes(normalizeString(search)) || normalizeString(aluno.CodigoContrato).includes(normalizeString(search))){
                                            return (
                                                <tr key={`${aluno.CodigoContrato}`}>
                                                    <td className="text-center">{aluno.CodigoContrato}</td>
                                                    <td>{aluno.NomeAluno}</td>
                                                    <td className="text-center">{aluno.Computador}</td>
                                                    <td className="text-center">{aluno.IpComputador}</td>
                                                    <td>
                                                        <Actions CodigoContrato={aluno.CodigoContrato} handleGetInfoStudent={handleGetInfoStudent}/>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })
                                })}
                            </Tbody>
                        </Table>
                    </div>
                }
                </div>
            <CardBody style={{overflowX:"auto"}} className={`${themeCtx?.theme == "dark" ? "bg-dark text-light":"bg-light"}`}>
                {presencas.map((value, key) =>{
                    return (
                        <>
                        <Accordion accordionHeaderClasses={`${themeCtx?.theme == "dark" ? "bg-dark text-light":"bg-light"}`} style={{maxWidth:"100%"}} 
                            accordionItemClasses={`${themeCtx?.theme == "dark" ? "bg-dark text-light":"bg-light"}`} accordionClasses={`${themeCtx?.theme == "dark" ? "bg-dark text-light":"bg-light"}`} idAccordion={`agenda`} 
                            accordionButtonClasses={`${style.myBgPrimary} fw-bold`} 
                            accordionButtonText={`${value.HoraInicio} - Qtd. ${value.Alunos.length}`} dataBsTarget={`n${key}`} >
                        <div style={{overflowX:"auto"}} className={`mt-2 card p-1 ${themeCtx?.theme == "dark" ? "bg-dark text-light":"bg-light"}`}>
                            <Table className={`table-bordered table-sm`}>
                                <Thead head={head} />
                                    <Tbody>
                                        {value.Alunos.map(aluno =>
                                            (
                                                <>
                                                    <tr>
                                                        <td className="text-center">{aluno.CodigoContrato}</td>
                                                        <td>{aluno.NomeAluno}</td>
                                                        <td className="text-center">{aluno.Computador}</td>
                                                        <td className="text-center">{aluno.IpComputador}</td>
                                                        <td>
                                                            <Actions CodigoContrato={aluno.CodigoContrato} handleGetInfoStudent={handleGetInfoStudent}/>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        )}
                                </Tbody>
                            </Table>
                        </div>
                    </Accordion>
                    </>
                    )
                })}

            </CardBody>
        </Card>
        {getInfoStudent &&
            <div className={`${style.rightSide} close`}>
                <div className={`${style.dialog}`}>
                    <Outlet context={[handleGetInfoStudent]} />
                </div>
            </div>
            }
        </div>
    )
    
}