import { IAirPollution } from "../types/types";
import api from "./api";

const getCurrent=(state:string,county:string)=>{
    const params = new URLSearchParams();
    let url = api.url.air;
    params.append("state", state);
    params.append('county',county)
    url += "?" + params.toString();
    return api.get<IAirPollution>(url).then(res=>res.data)
    

}
const getForecase=(lat:number,lon:number,start:number,end:number)=>{
    const params = new URLSearchParams();
    let url = `${api.url.air}/forecast`;
    params.append("lat", String(lat));
    params.append("lon",String(lon))
    params.append("start",String(start))
    params.append('end',String(end))
    params.append('appid',process.env.REACT_APP_API_KEY ??"")
    // Thêm các tham số vào URL nếu chúng tồn tại
    url += "?" + params.toString();
    return api.get<IAirPollution>(url).then(res=>res.data)
}
const airPollutionService={
    getCurrent,getForecase
}
export default airPollutionService