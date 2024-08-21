import { IWeatherCounty, IWeatherData } from "../types/types";
import api from "./api"
const get=(state:string,county:string)=>{
    const params = new URLSearchParams();
    let url = api.url.weather;
    params.append("state", state);
    params.append('county',county)
    url += "?" + params.toString();
    return api.get<IWeatherData>(url).then(res=>res.data)
}
const listRandom=()=>{
    return api.get<IWeatherCounty[]>(`${api.url.weather}/random`).then(res=>res.data)
}
const currentWeatherService={
    get,listRandom
}
export default currentWeatherService