import { Helmet } from 'react-helmet';
import style from "./style.module.css"
import { useState } from "react";
import {Header} from "../../../Components/Agenda/Header";
import {Body} from "../../../Components/Agenda/Body";
import {useLoaderData, useNavigate, Outlet} from "react-router-dom"
import Loader from "../../../Components/Loader";

export default function Agenda(){
    const [loading, setLoading] = useState(false);
    const agenda = useLoaderData();
    const [weekDay, setWeekDay] = useState(new Date().getDay())
    
    const navigate = useNavigate();
    const [getInfoStudent, setGetInfoStudent] = useState(false)

    const [btnActive, setBtnActive] = useState({
        btn:'all',
        active:true,
    });
    const [sistema, setSistema] = useState('all')

    const handleChangeSystemBtn = (e)=>{
        setBtnActive({btn: e.target.id, active: true})
        setSistema(e.target.id);
    }
    
    const handleGetInfoStudent = ()=>{
        setGetInfoStudent(!getInfoStudent)
    }
 
    const handleChangeDay = (e)=>{
        const day = e.target.value.trim();
        setWeekDay(day)
        setLoading(true)
        setGetInfoStudent(false);
        navigate(`/admin/agenda/${day}`)
    }
    return (
        <div className="d-flex flex-column">
            {loading &&
                <Loader />
            }
            <Helmet>
                <title>Agenda</title>
            </Helmet>
            <div className={`leftside`}>
                <Header onChange={handleChangeDay} day={weekDay} onClick={handleChangeSystemBtn}  btnActive={btnActive} />
                <Body handleGetInfoStudent={handleGetInfoStudent} loading={{loading, setLoading}} sistema={sistema} agenda={agenda}/>
            </div>
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