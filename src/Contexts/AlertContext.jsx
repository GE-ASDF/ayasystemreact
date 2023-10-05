import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import Alert from "../Components/Alert";

export const AlertContext = createContext(null);

export const AlertProvider = ({children})=>{

    const [alert, setAlert] = useState({
        show:false,
        type:'success',
        message:'',
        time: 7,
    });

    const handleCloseAlert = ()=>{
        setAlert({show:false, type:'danger',time:7, message:''})
    }

      useEffect(()=>{
        const id = setTimeout(() => {
            handleCloseAlert();
        }, alert.time * 1000);
        return () => clearTimeout(id)
      },[alert])
   
    
    return (
        <AlertContext.Provider value={{alert, setAlert}}>
            {alert.show && <Alert onClick={handleCloseAlert} type={alert.type} message={alert.message} />}
            {children}
        </AlertContext.Provider>
    );
}

export const useAlert = ()=> useContext(AlertContext);