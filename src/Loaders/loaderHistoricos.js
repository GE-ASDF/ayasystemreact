import fetchData from "../utils/http";

export const loaderHistoricos = async ({params})=>{
    const data = await fetchData("/admin/historicos/"+params.CodigoContrato);
    return data;
}