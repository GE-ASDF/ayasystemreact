import HamburguerMenu from "../HamburguerMenu";
import hookOpenMenu from "../../Hooks/hookOpenMenu";
import NavContent from "../NavContent"

export default function MainNav(props){
    const [handleOpenMenu, openMenu] = hookOpenMenu();
    
    return (
        <>
            <HamburguerMenu onClick={handleOpenMenu} />
            {window.innerWidth > 500 && openMenu == false ? 
                <NavContent />
            :
        <>
            <HamburguerMenu onClick={handleOpenMenu} />
            {window.innerWidth < 500 && openMenu == false ? 
            <NavContent />:""}
        </>
        }
        </>
    )
        
        
}