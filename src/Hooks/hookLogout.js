import { useState } from "react";

export default function hookLogout(){
    const [logout, setLogout] = useState(false);

    function handleLogout(e){
        e.preventDefault();
        const logado = JSON.parse(localStorage.getItem("logado"));
        if(logado){
            localStorage.clear();
        }
        setLogout(true);
    }

    return [logout, handleLogout]
}