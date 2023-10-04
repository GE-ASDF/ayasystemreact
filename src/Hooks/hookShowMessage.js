import { useState } from "react"

export const hookShowMessage = ()=>{
    const [showMessage, setShowMessage] = useState(false);
    const handleShowMessage = (show)=>{
        setShowMessage(show);
    }
    return [showMessage, handleShowMessage];
}