import { ICounty, IListCounty, IListState, IState } from "../types/types";
import api from "./api";

const list=(name?:string,state?:string,page?:number,pageSize?:number)=>{
    let url=`${api.url.county}`;
    const params=new URLSearchParams();
    if(name){
        params.append("name",name)
    }
    if(page){
        params.append('page',String(page))
    }
    if(pageSize){
        params.append("pageSize",String(pageSize))
    }
    if(state){
        params.append("state",String(state))
    }
    url+="?"+params.toString()
    return api.get<IListCounty>(url).then(res=>res.data)
}
const get=(id:string)=>{
    return api.get<ICounty>(`${api.url.county}/${id}`).then(res=>res.data)
}
const countyService={
    list,get
}
export default countyService