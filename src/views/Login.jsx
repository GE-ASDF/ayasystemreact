import { useState } from "react"

async function fetchData(){
    const data = await fetch("http://localhost:3000/auth",{method:"GET", Accept:"application/json"})
    const res = await data.json();
    return res;
}

export default function Login(){

    const [Usuario, setUsuario] = useState('');
    const [Senha, setSenha] = useState('');

    const handleLoginSubmit = async (e)=>{
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
                window.location.href = "/admin"
            }else{
                localStorage.clear()
                localStorage.setItem("logado", JSON.stringify({
                    'Usuario': response.data.Usuario,
                    'Nome': response.data.Nome,  
                    "Administrador": response.data.Administrador
                }));
                window.location.href = "/admin"
            }
        }else{
            alert("Ocorreu um erro", response)
        }
    }
    
    return (
        <form onSubmit={handleLoginSubmit} action="http://pc-1/ayasystem/login/auth">
            <div className="form-group">
                <label htmlFor="">Usuário</label>
                <input onChange={(e)=> setUsuario(e.target.value)} type="text" name="Usuario" />
            </div>
            <div className="form-group">
                <label htmlFor="">Senha</label>
                <input onChange={(e)=> setSenha(e.target.value)} type="text" name="Senha" />
            </div>
            <button className="btn">Login</button>
        </form>
    )
}