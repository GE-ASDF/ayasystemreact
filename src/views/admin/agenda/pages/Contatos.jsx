import { useEffect } from "react";
import { useState } from "react";
import {useOutletContext,useLocation, useLoaderData,useNavigate} from "react-router-dom"
import Button from "../../../../Components/Button";
import { Card } from "../../../../Components/Cards/Cards";
import Loader from "../../../../Components/Loader";
import { getOnlyNumbers } from "../../../../helpers/getOnlyNumbers";
import {useTemplate} from "../../../../Contexts/TemplateContext";
import Textarea from "../../../../Components/Forms/Textarea";
import {useForm} from "react-hook-form"
import { useAlert } from "../../../../Contexts/AlertContext";
import fetchData from "../../../../utils/http";
import { normalizeString } from "../../../../utils/normalizeString";
   



export default function Contatos(){
    const {alert, setAlert} = useAlert();
    const {dataUser} = useTemplate();
    const userLogged = JSON.parse(dataUser);
    const {control,handleSubmit} = useForm();
    const DataHistorico = new Date().toLocaleDateString('pt-br').split("/").reverse().join("-")
    const {tipoAluno, data} = useLoaderData();

    const [historico, setHistorico] = useState({
        CodigoContrato: data.CodigoContrato,
        NomeAluno:data.NomeAluno,
        DataHistorico: DataHistorico,
        ResponsavelHistorico:userLogged.Nome,
        Historico: 'Entrei em contato via WhatsApp.',
    });

    const [loading, setLoading] = useState(true);
    const local = useLocation().pathname.split("/contatos").filter((el)=> el);   
    const [handleGetInfoStudent] = useOutletContext();
    const navigate = useNavigate();

    const handleNavigate = ()=>{
        navigate(`${local[0]}`);
    }
    
    useEffect(()=>{
        setLoading(false);
    },[tipoAluno,data])
    
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
    
    const handleHistorico = (e)=>{
        setHistorico({...historico, [e.target.name]:e.target.value})
    }

    const handleSaveHistorico = async (e)=>{
        e.preventDefault();
        const response = await fetchData('/admin/historicoscreate','POST',historico);
        console.log(historico)
        if(response.affectedRows >= 1){
            setAlert({show:true,
                type:'success',
                message:'Histórico cadastrado com sucesso',
                time: 7,})
        }else{
            setAlert({show:true,
                type:'danger',
                message:'Histórico não foi cadastrado.',
                time: 7,})
        }
    }
    return (
        <div style={{overflowY:"auto", maxHeight:"100%", height:"100%"}}>
          
            <Button className="btn close btn-danger" onClick={()=> {handleGetInfoStudent(); handleNavigate()}} >X</Button>
            {loading && 
                <Loader style={{minWidth:"0",width:"100%"}}  className={`d-flex justify-content-center `} />
            }
            <Card className="mt-2 p-1 bg-dark border text-white">
                <h1 className="title text-center fs-3">{data.NomeAluno}</h1>
                <Card className="mt-2 p-1 bg-dark text-white">
                    <h4 className="fs-6">Informações de contato:</h4>
                    <div className="d-flex flex-column justify-content-start align-items-start gap-2">
                        {data.Telefone && <span>Telefone:  {getOnlyNumbers(data.Telefone)} <a className="btn btn-success text-white btn-sm" href={`https://wa.me/${getOnlyNumbers(data.Telefone)}`}><i className="bi bi-whatsapp"></i></a></span>}
                        {data.Celular && <span>Celular:  {getOnlyNumbers(data.Celular)} <a className="btn btn-success text-white btn-sm" href={`https://wa.me/${getOnlyNumbers(data.Celular)}`}><i className="bi bi-whatsapp"></i></a></span>}
                    </div>
                    <div className="form-group d-flex flex-column gap-1 justify-content-start align-items-start">
                        <span className="fw-bold">Digite sua mensagem:</span>
                        <textarea defaultValue={`Olá, ${data.NomeAluno}! Tudo bem? Eu sou da Prepara Cursos e gostaria de saber o motivo da sua falta hoje na aula. Espero seu retorno!`} name="message" placeholder="Digite sua mensagem" className="form-control" id="" cols="30" rows="5"></textarea>
                        <Button className={`btn-success btn-sm`}>Enviar</Button>
                    </div>
                    <div className="form-group mt-2 d-flex flex-column gap-1 justify-content-start">
                        <h4 className="fw-bold">Dados do histórico</h4>
                        <div className="form-group d-flex flex-column">
                            <span>Escolha uma data</span>
                            <input onChange={handleHistorico} defaultValue={`${DataHistorico}`} type="date" name="DataHistorico" className="form-control" id="" />
                        </div>
                        <div  className="form-group d-flex flex-column justify-content-start align-items-start gap-2">
                            <span>Digite o histórico</span>
                            <textarea onChange={handleHistorico} defaultValue={`${historico.Historico}`} name="Historico" placeholder="Digite sua mensagem" className="form-control" id="" cols="30" rows="5"></textarea>
                            <Button onClick={handleSaveHistorico} className={`btn myBtnPrimary btn-sm`}>Cadastrar</Button>
                        </div>
                    </div>
                </Card>
            </Card>
        </div>
    )
}