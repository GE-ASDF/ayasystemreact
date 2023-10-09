import axios from "axios"
import Cookies from "js-cookie"
import config from "../../config/config";

const TOKEN = Cookies.get("token");

const Authorization = TOKEN ? `${TOKEN}`:"no";

const defaultHeaders = {
    Authorization: Authorization,
    "Content-Type": "application/json"
}

export const api = axios.create({
    baseURL: config.baseUrlBackend,
    headers:defaultHeaders,
})