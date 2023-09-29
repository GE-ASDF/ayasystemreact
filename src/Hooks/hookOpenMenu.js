import { useState } from "react";

export default function hookOpenMenu(){
    const [openMenu, setOpenMenu] = useState(false);

    const handleOpenMenu = (e)=>{
        setOpenMenu((c)=>{
            return c = !c;
        })
    }

    return [handleOpenMenu, openMenu]
}