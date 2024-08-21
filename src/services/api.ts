
import axios from "axios";
const url = {
  baseUrl: "https://weather-app-be-rosy.vercel.app/api",
  weather: 'weather',
  forecast: "forecast",
  air: "air",
  state: 'state',
  county: 'county',
  icon: 'icon',
  address: 'address'

};
const content = {
  json: "application/json",
  formData: "multipart/form-data"
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
