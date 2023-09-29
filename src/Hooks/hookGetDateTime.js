import { useEffect, useState } from "react";

function getTime(){
    return new Date().toLocaleString('pt-Br');
}

export default function hookGetDateTime(){
    const [time, setTime] = useState(getTime());

    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(getTime());
        }, 1000);
        
        return () => {

            clearInterval(intervalID);
        };
    }, []);
    
    return [time];
}