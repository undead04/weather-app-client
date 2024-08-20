import { icon } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
const url = {
  baseUrl: "http://localhost:4000/api",
  weather:'https://api.openweathermap.org/data/2.5/weather',
  forecast:"https://api.openweathermap.org/data/2.5/forecast/",
  air:"http://api.openweathermap.org/data/2.5/air_pollution",
  address:"http://api.openweathermap.org/geo/1.0/direct",
  state:'state',
  county:'county',
  map:"https://tile.openweathermap.org/map/"
};
const content={
  json:"application/json",
  formData:"multipart/form-data"
}
const instance = axios.create({
  baseURL: url.baseUrl,
  headers: {
    "Content-Type": content.json,
    Accept: "application/json",
  },
});

const api = {
  url,
  get: instance.get,
  post: instance.post,
  delete: instance.delete,
  put: instance.put,
  patch: instance.patch,
  
};
export default api;
