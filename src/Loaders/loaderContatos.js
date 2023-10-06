import fetchData from "../utils/http";

export const loaderContatos = async ({params})=>{
    const data = await fetchData("/admin/contatos/"+params.CodigoContrato.trim());
    return data;
}