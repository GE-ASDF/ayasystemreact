import Cookies from "js-cookie";

export const createUserSession = (data)=>{
    localStorage.setItem("logado", JSON.stringify(data))
}

/**
 * Esta função serve para armazenar em cookie o token recebido pelo usuário
 * @param {string} token - Token recebido pelo usuário
 * @returns void
 */
export const setUserCookie = (token)=>{
    Cookies.set("token", token)
    return true;
}