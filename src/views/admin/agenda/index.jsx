import { Link } from "react-router-dom"
import { Helmet } from 'react-helmet';
import style from "./style.module.css"
import { useState } from "react";
import {Header} from "../../../Components/Agenda/Header";
import {Body} from "../../../Components/Agenda/Body";
import {useLoaderData, useNavigate} from "react-router-dom"
export default function Agenda(){
    const agenda = useLoaderData();
    const navigate = useNavigate();
    const [btnActive, setBtnActive] = useState({
        btn:'all',
        active:true,
    });

 
    const handleChangeSystemBtn = (e)=>{
        setBtnActive({btn: e.target.id, active: true})
    }
    const handleChangeDay = (e)=>{
        const weekDay = e.target.value;
        navigate(`/admin/agenda/${weekDay}`)
    }
    return (
        <>
            <Helmet>
                <title>Agenda</title>
            </Helmet>
                <Header onChange={handleChangeDay} onClick={handleChangeSystemBtn} btnActive={btnActive} />
            <Body agenda={agenda}/>
        </>
    )
}