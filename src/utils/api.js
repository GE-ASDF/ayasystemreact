import axios from "axios"
import Cookies from "js-cookie"

const TOKEN = Cookies.get("token");

const Authorization = TOKEN ? `${TOKEN}`:"no";

const defaultHeaders = {
    Authorization: Authorization,
    "Content-Type": "application/json"
}

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_BACKEND,
    headers:defaultHeaders,
})