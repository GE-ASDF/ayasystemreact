import fetchData from "../utils/http";
import { api } from "../utils/api";

export async function getSchedule(weekDay = new Date().getDay()){
    let {data} = await api.get('/admin/agenda/'+weekDay);
    // let groups = await fetchData("/admin/agenda/"+weekDay);
    return data;
}

export default async function loaderAgenda({params}){
    if(params && (params.weekDay < 1 || params.weekDay > 7)){
        params.weekDay = new Date().getDay();
    }
    let groups = await getSchedule(params.weekDay);
    return groups;
}