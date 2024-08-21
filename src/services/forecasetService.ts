import { IWeatherForecast } from "../types/types";
import api from "./api";

const get = (state:string,county:string) => {
    const params = new URLSearchParams();
    let url = api.url.forecast;
    params.append("state", state);
    params.append('county',county)
    url += "?" + params.toString();
    return api.get<IWeatherForecast>(url).then(res => res.data);
}

const forecastService = { get };
export default forecastService;
