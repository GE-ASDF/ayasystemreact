import { useState } from "react";


export default function hookAuthLogin(){
    const [logado, setLogado] = useState(false);

    async function handleLoginSubmit(e, Usuario, Senha){
        e.preventDefault();
        const formData = new FormData();
        formData.append("Usuario", Usuario);
        formData.append("Senha", Senha);
        formData.append("fetchApi", "true");
        const response = await fetchData(formData);        
    
        if(response.error == false){
            const logado = JSON.parse(localStorage.getItem("logado"))
            if(!logado){
                localStorage.setItem("logado", JSON.stringify({
                    'Usuario': response.data.Usuario,
                    'Nome': response.data.Nome,  
                    "Administrador": response.data.Administrador
                }));
                setLogado(true);
    
            }else{
                localStorage.clear()
                localStorage.setItem("logado", JSON.stringify({
                    'Usuario': response.data.Usuario,
                    'Nome': response.data.Nome,  
                    "Administrador": response.data.Administrador
                }));
                setLogado(true);
            }
        }
    }
    return [logado, handleLoginSubmit]
}


