import { useEffect, useState } from "react"

export default function Home(){
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState('');
    
    const getToken = async ()=>{
        try{
            const user = {id:1, name:"Anderson"}
            const response = await fetch("http://localhost:3001/token/"+user.id+"/"+user.name, {method:"GET",headers:{"Content-Type":"application/json"}})
            const json = await response.json();
            setToken(json.token);
            sessionStorage.setItem("token", json.token)
        }catch(err){
            console.log(err)
        }
    }
    const getUsers = async (token)=>{
        try{
            const token = sessionStorage.getItem("token");
            console.log(token)
            const response = await fetch("http://localhost:3001/teste/",{headers:{Authorization:token, "Content-Type":"application/json"}})
            const json = await response.json();
            setUsers(json);
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getToken()
        getUsers();
    },[])
    console.log(users);
    return (
        <h1>{token}</h1>
    )
}