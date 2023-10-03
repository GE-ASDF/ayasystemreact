import { Link } from "react-router-dom"
import { Helmet } from 'react-helmet';
import style from "./style.module.css"
import { useState } from "react";
import {Header} from "../../../Components/Agenda/Header";
import {Body} from "../../../Components/Agenda/Body";
import {useLoaderData, useNavigate} from "react-router-dom"
import Loader from "../../../Components/Loader";

export default function Agenda(){
    const [loading, setLoading] = useState(false);
    const agenda = useLoaderData();
    const [weekDay, setWeekDay] = useState(new Date().getDay())
    const navigate = useNavigate();
    const [btnActive, setBtnActive] = useState({
        btn:'all',
        active:true,
    });
    const [sistema, setSistema] = useState('all')

 
    const handleChangeSystemBtn = (e)=>{
        setBtnActive({btn: e.target.id, active: true})
        setSistema(e.target.id);
        setLoading(()=> !loading)
    }
    const handleChangeDay = (e)=>{
        const day = e.target.value.trim();
        setWeekDay(day)
        setLoading(()=> !loading)
        navigate(`/admin/agenda/${day}`)
    }
    return (
        <>
            {loading &&
                <Loader />
            }
            <Helmet>
                <title>Agenda</title>
            </Helmet>
            <Header  onChange={handleChangeDay} day={weekDay} onClick={handleChangeSystemBtn}  btnActive={btnActive} />
            <Body loading={{loading, setLoading}} sistema={sistema} agenda={agenda}/>
        </>
    )
}