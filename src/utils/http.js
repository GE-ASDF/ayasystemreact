const session = sessionStorage.getItem("logado");
const sessionStored = JSON.parse(session);
export const TOKEN = sessionStored?.token;

const Authorization = TOKEN ? `${TOKEN}`:"no";
const BASE_URL = "http://localhost:3001";
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
            error:true,
            message: err
        }
    }
}
export default fetchData;