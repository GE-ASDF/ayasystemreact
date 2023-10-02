export const createUserSession = (data)=>{
    localStorage.setItem("logado", JSON.stringify(data))
}