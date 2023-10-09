import fetchData from "../utils/http";

export const loaderListar = async ()=>{
    const data = await fetchData(`/admin/listar`);
    return data;
}