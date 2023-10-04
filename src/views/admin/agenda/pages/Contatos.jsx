import { useEffect } from "react";
import { useState } from "react";
import {useOutletContext,useLocation, useLoaderData,useNavigate} from "react-router-dom"
import Button from "../../../../Components/Button";
import { Card } from "../../../../Components/Cards/Cards";
import Loader from "../../../../Components/Loader";

export default function Contatos(){


    const DataHistorico = new Date().toLocaleDateString('pt-br').split("/").reverse().join("-")
    const {tipoAluno, data} = useLoaderData();
    const [historico, setHistorico] = useState({
        CodigoContrato: data.CodigoContrato,
        DataHistorico: DataHistorico,
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
    },[tipoAluno])
    
    const getOnlyNumbers = (number)=>{
        const clear = number.replace(/[^0-9]/g,'')

        if(!clear.startsWith('55')){
            const newNumber = `55${clear}`;
            if(newNumber.length == 13){
                if(newNumber[4] == '9'){
                    return newNumber.slice(0,4) + newNumber.slice(5)
                }
            }
            return newNumber;
        }else{
            if(clear.length == 13){
                if(clear[4] == '9'){
                    return clear.slice(0,4) + clear.slice(5)
                }
            }
            return clear;
        }
    }
    const handleHistorico = (e)=>{
        setHistorico({...historico, [e.target.name]:e.target.value})
    }
    const handleSaveHistorico = ()=>{
        console.log(historico);
    }
    return (
        <div style={{overflowY:"auto", maxHeight:"100%", height:"100%"}}>
          
            <Button className="btn close btn-danger" onClick={()=> {handleGetInfoStudent(); handleNavigate()}} >X</Button>
            {loading && 
                <Loader style={{minWidth:"0",width:"100%"}}  className={`d-flex justify-content-center `} />
            }
            <Card  className="mt-2 p-1 bg-dark border text-white">
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
                        <div className="form-group d-flex flex-column justify-content-start align-items-start gap-2">
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