const session = localStorage.getItem("logado");
const sessionStored = JSON.parse(session);
export let TOKEN = sessionStored?.token;

const Authorization = TOKEN ? `${TOKEN}`:"no";
const BASE_URL = import.meta.env.VITE_BASE_URL_BACKEND;
const defaultHeaders = {
    Authorization: Authorization,
    "Content-Type": "application/json"
}

/**
 * @param {string} endpoint
 * @param {object} body
 * @param {string} method
 * @param {object} customHeaders
 * @return {object | array} 
 */

const fetchData = async(endpoint = "", method = "GET", body = {}, customHeaders = {})=>{
    const headers = {...defaultHeaders, ...customHeaders}
    const config = {method, headers};
    if(Object.keys(body).length > 0) config.body = JSON.stringify(body); 

    try{
        const response = await fetch(`${BASE_URL}${endpoint}`, config);
        const data = await response.json();
        return data;
    }catch(err){
        return {
            typeError:'catch',
            error:true,
            message: err
        }
    }
}
export default fetchData;