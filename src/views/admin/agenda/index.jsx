import { Link } from "react-router-dom"
import { Helmet } from 'react-helmet';
import style from "./style.module.css"
import { useState } from "react";
import {Header} from "../../../Components/Agenda/Header";
import {Body} from "../../../Components/Agenda/Body";

export default function Agenda(){
    const [btnActive, setBtnActive] = useState({
        btn:'all',
        active:true,
    });
    const handleChangeSystemBtn = (e)=>{
        setBtnActive({btn: e.target.id, active: true})
    }
    return (
        <>
        <Helmet>
            <title>Agenda</title>
        </Helmet>
        <Header onClick={handleChangeSystemBtn} btnActive={btnActive} />
        <Body />
        </>
    )
}