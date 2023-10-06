import {useOutletContext,useLocation, useLoaderData,useNavigate} from "react-router-dom"
import Button from "../../../../Components/Button";
import { Card } from "../../../../Components/Cards/Cards";
import Alert from "../../../../Components/Alert";
import { useState } from "react";
import { hookShowMessage } from "../../../../Hooks/hookShowMessage";
import { formatDateToUser } from "../../../../utils/formatDateBD";
export default function Contatos(){
    const historicos = useLoaderData();
    const local = useLocation().pathname.split("/historicos").filter((el)=> el); 
    const [historico, setHistorico] = useState({
        CodigoHistorico:'',
        Historico:'',
    })  
    const handleTypeHistorico = (e)=>{
        setHistorico({CodigoHistorico: e.target.id, Historico:e.target.value})
    }

    const [handleGetInfoStudent] = useOutletContext();
    const navigate = useNavigate();
    const handleNavigate = ()=>{
        navigate(`${local[0]}`);
    }
    
    return (
        <div style={{overflowY:"auto", maxHeight:"100%", height:"100%"}}>
            <Button className="btn close btn-danger" onClick={()=> {handleGetInfoStudent(); handleNavigate()}} >X</Button>
            {historicos.length > 0 &&
            <Card className="mt-2 p-1 bg-dark border text-white">
                <h1 className="title text-center fs-3">{historicos[0].NomeAluno}</h1>
                <Card className="mt-2 p-1 bg-dark text-white">
                    <h4 className="fs-6">Históricos:</h4>
                    <div className="d-flex flex-column gap-3 justify-content-start align-items-start">
                        {historicos.map((historico)=>{
                            return (
                                <Card key={`${historico.CodigoHistorico}`} className={`bg-dark text-white p-1`}>
                                    <div className="d-flex flex-column">
                                        <span className="">Informações do histórico:</span>
                                        <span>Responsável: {historico.ResponsavelHistorico}</span>
                                        <span>Data do histórico: {formatDateToUser(historico.DataHistorico)}</span>
                                    </div>
                                    <textarea onChange={handleTypeHistorico} defaultValue={`${historico.Historico}`} className="form-control" name="Historico" id={`${historico.CodigoHistorico}`} cols="30" rows="5">
                                    </textarea>
                                </Card>
                            )
                        })}
                    </div>
                </Card>
            </Card>
            }
            {historicos.length <= 0 && 
                <Alert className={`mt-5`} type={`danger`} message={`Não há históricos registrados para este contrato.`} />
            }
        </div>

    )
}