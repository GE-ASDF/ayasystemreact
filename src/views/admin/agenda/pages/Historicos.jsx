import {useOutletContext,useLocation, useLoaderData,useNavigate} from "react-router-dom"
import Button from "../../../../Components/Button";
import { Card } from "../../../../Components/Cards/Cards";
import Alert from "../../../../Components/Alert";
import { useState, useEffect } from "react";
import { formatDateToUser } from "../../../../utils/formatDateBD";
import fetchData from "../../../../utils/http";
import { useAlert } from "../../../../Contexts/AlertContext";
import {normalizeString} from "../../../../utils/normalizeString";

export default function Contatos(){
    const {setAlert} = useAlert();
    const [historicos, setHistoricos] = useState(useLoaderData())
    const local = useLocation().pathname.split("/historicos").filter((el)=> el); 
 
    const handleTypeHistorico = async(e, CodigoHistorico)=>{
        const history = {CodigoHistorico: CodigoHistorico, Historico:e.target.value}

        if(!history.CodigoHistorico || !history.Historico){
            setAlert({type:"danger",show:true,time:7,message:"Há campos obrigatórios vazios."})
            return;
        }     

        const update = await fetchData("/admin/historicosupdate", 'POST', history);
   
        if(update.error){
            setAlert({type:"danger",show:true,time:7,message:update.errors[0].msg})
        }else{
            if(update.affectedRows > 0){
                setAlert({type:"success",show:true,time:7,message:"Registro salvo com sucesso."})
            }else{
                setAlert({type:"warning",show:true,time:7,message:"O registro não foi salvo. Tente novamente."})
            }
        }
    }

    const [handleGetInfoStudent] = useOutletContext();
    const navigate = useNavigate();
    const handleNavigate = ()=>{
        navigate(`${local[0]}`);
    }
    const deleteHistorico = async (CodigoHistorico)=>{
        const confirm = window.confirm("Deseja realmente realizar esta ação")
        if(confirm){
            const deleted = await fetchData(`/admin/historicosdelete/${CodigoHistorico}`, "GET")
            if(deleted.error){
                setAlert({type:"danger",show:true,message:"Não foi possivel apagar o histórico.", time:7})
            }else if(deleted.deleted.affectedRows > 0 || deleted.error == false){
                setAlert({type:"success",show:true,message:deleted.message, time:7})
                setHistoricos(historicos.filter((historico) => historico.CodigoHistorico != CodigoHistorico))
            }
        }
    }
    useEffect(()=>{
        const handleKeyEsc = (e)=>{
            const esc = normalizeString(e.key);
            if(esc == 'escape'){
                handleGetInfoStudent();
                handleNavigate();
            }
        }
        document.addEventListener("keydown",handleKeyEsc)
        return ()=> document.removeEventListener("keydown", handleKeyEsc)
    })
    return (
        <div style={{overflowY:"auto", maxHeight:"100%", height:"100%"}}>
            <Button className="btn close btn-danger" onClick={()=> {handleGetInfoStudent(); handleNavigate()}} >X</Button>
            {historicos.length > 0 &&
            <Card className="mt-2 p-1 bg-dark border text-white">
                
                <h1 className="title text-center fs-3">{historicos[0].NomeAluno}</h1>
                <Card className="mt-2 p-1 bg-dark text-white">
                    
                    <h4 className="fs-6">Históricos:</h4>
                    <div  className="d-flex flex-column gap-3 justify-content-start align-items-start">
                        {historicos.map((historico)=>{
                            return (
                                <Card key={`${historico.CodigoHistorico}`} className={`bg-dark text-white p-1`}>
                                    
                                    <div className="d-flex flex-column">
                                        <span className="">Informações do histórico:</span>
                                        <span>Responsável: {historico.ResponsavelHistorico}</span>
                                        <span>Data do histórico: {formatDateToUser(historico.DataHistorico)}</span>
                                    </div>
                                    <div className="form-group d-flex flex-column justify-content-center align-items-start gap-2">
                                    <textarea onChange={(e)=> handleTypeHistorico(e, historico.CodigoHistorico)} defaultValue={`${historico.Historico}`} className="form-control" name="Historico" id={`${historico.CodigoHistorico}`} cols="30" rows="5">
                                        </textarea>
                                        <Button onClick={()=> deleteHistorico(historico.CodigoHistorico)} className={`btn-danger`}>X</Button>
                                    </div>
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