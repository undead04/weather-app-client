import { IAddress, IWeatherCounty, IWeatherData } from "../types/types";
import api from "./api"
const get=(state:string,county:string)=>{
    const params = new URLSearchParams();
    let url = api.url.address;
    params.append("state", state);
    params.append('county',county)
    url += "?" + params.toString();
    return api.get<IAddress[]>(url).then(res=>res.data)
}

const addressService={
    get
}
export default addressService