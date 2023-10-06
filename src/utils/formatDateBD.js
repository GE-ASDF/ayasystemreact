export const formatDateToBD = (date)=>{
    return date.split("/").reverse().join("-");
}

export const formatDateToUser = (date)=>{
    return date.split("-").reverse().join("/");
}