export const createUserSession = (data)=>{
    sessionStorage.setItem("logado", JSON.stringify(data))
}