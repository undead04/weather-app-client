import { useSearchParams } from "react-router-dom"
import api from "./api";
const get=(name:string)=>{
    return `${api.url.baseUrl}/${api.url.icon}/${name}`
}
const IconService={
    get
}
export default IconService