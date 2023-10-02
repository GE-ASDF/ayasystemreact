import fetchData from "../utils/http";


export async function getSchedule(weekDay = new Date().getDay()){
    let groups = await fetchData("/admin/agenda/"+weekDay);
    return groups;
}

export default async function loaderAgenda({params}){
    if(params && (params.weekDay < 1 || params.weekDay > 7)){
        params.weekDay = new Date().getDay();
    }
    let groups = await getSchedule(params.weekDay);
    return groups;
}