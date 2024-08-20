import { useSearchParams } from "react-router-dom"
import api from "./api";

const get=(name:string)=>{
    let url=`https://openweathermap.org/img/wn/${name}@2x.png`
    return url
}
const InconService={
    get
}
export default InconService