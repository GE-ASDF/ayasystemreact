import fetchData from "../utils/http";
import {formatDateToBD} from "../utils/formatDateBD";
export const loaderPresencas = async ({params})=>{
    if(!params.DataPresenca){
        params.DataPresenca = formatDateToBD(new Date().toLocaleDateString("pt-br"));
    }
    const data = await fetchData("/admin/presencas/"+params.DataPresenca.trim());
    return data;
}