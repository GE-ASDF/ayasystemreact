import fetchData from "../utils/http";

export async function checkAuth(){
    const verified = await fetchData('/verifyToken');    
    return await verified;
}