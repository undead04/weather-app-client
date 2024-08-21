export interface IAddress{
    
        "name": string,
        "local_names": {
            vi:string
        }
        "lat": number,
        "lon": number,
        "country": string
    
}
export interface IState{
    name:string
}
export interface IListState{
    data:IState[],
    totalPage:number,
    cureentPage:number
}
export interface ICounty{
    name:string,
    state:IState,
}
export interface IListCounty{
    data:ICounty[],
    totalPage:number,
    cureentPage:number
}
interface Coord {
    lon: number;
    lat: number;
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

interface Rain {
    "1h": number;
}

interface Clouds {
    all: number;
}

interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface IWeatherData {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    rain?: Rain;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

interface FeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
}
interface Temp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
    
}
interface Forecast {
    dt: number;
    main:Main;
    weather:Weather[];
    cloud:Clouds;
    wind:Wind
    visibility:number,
    pop:number,
    sys:Sys;
    rain:Rain,
    dt_txt:string
}

interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
}

export interface IWeatherForecast {
    city: City;
    cod: string;
    message: number;
    cnt: number;
    list: Forecast[];
}
export interface components{
   
        co: number; // Carbon Monoxide in μg/m³
        no: number; // Nitrogen Monoxide in μg/m³
        no2: number; // Nitrogen Dioxide in μg/m³
        o3: number; // Ozone in μg/m³
        so2: number; // Sulfur Dioxide in μg/m³
        pm2_5: number; // Fine Particulate Matter (PM2.5) in μg/m³
        pm10: number; // Coarse Particulate Matter (PM10) in μg/m³
        nh3: number; // Ammonia in μg/m³
      
}
interface AirPollutionForecast {
    dt: number; // UNIX timestamp
    main: {
      aqi: number; // Air Quality Index
    };
    components: components
  }
  
export interface IAirPollution{
    coord:Coord,
    list:AirPollutionForecast[]
}
export interface IWeatherCounty{
    weather:IWeatherData,
    county:ICounty
}
