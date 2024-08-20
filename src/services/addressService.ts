import { IAddress } from "../types/types";
import api from "./api";

const get=(q:string)=>{
    const params = new URLSearchParams();
    let url = `${api.url.address}`;
    params.append('q',q);
    params.append('limit',String(1))
    params.append('appid',process.env.REACT_APP_API_KEY??"")
    url+="?"+params.toString()
    return api.get<IAddress[]>(url).then(res=>res.data)
}
const addressService={get}
export default addressService