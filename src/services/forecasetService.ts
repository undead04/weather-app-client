import { IWeatherForecast } from "../types/types";
import api from "./api";

const get = (lat:number,lon:number, cnt: number) => {
    const params = new URLSearchParams();
    let url = api.url.forecast;
    params.append("lat", String(lat));
    params.append('lon',String(lon));
    params.append('cnt', String(cnt));
    params.append('lang', "vi");
    params.append('appid', process.env.REACT_APP_API_KEY ?? "");

    // Thêm các tham số vào URL nếu chúng tồn tại
    if (params.toString()) {
        url += "?" + params.toString();
    }

    return api.get<IWeatherForecast>(url).then(res => res.data);
}

const forecastService = { get };
export default forecastService;
