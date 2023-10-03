import axios from "axios"

const session = localStorage.getItem("logado");
const sessionStored = JSON.parse(session);
export let TOKEN = sessionStored?.token;

const Authorization = TOKEN ? `${TOKEN}`:"no";

const defaultHeaders = {
    Authorization: Authorization,
    "Content-Type": "application/json"
}

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_BACKEND,
    headers:defaultHeaders,
})