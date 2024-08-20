import { IListState, IState } from "../types/types";
import api from "./api";

const list=(name?:string,page?:number,pageSize?:number)=>{
    let url=`${api.url.state}`;
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
    url+="?"+params.toString()
    return api.get<IListState>(url).then(res=>res.data)
}
const get=(id:string)=>{
    return api.get<IListState>(`${api.url.state}/${id}`).then(res=>res.data)
}
const stateService={
    get,list
}
export default stateService