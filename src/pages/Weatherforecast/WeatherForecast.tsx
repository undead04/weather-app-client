import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  IAddress,
  IAirPollution,
  IWeatherData,
  IWeatherForecast,
} from "../../types/types";
import {
  capitalizeFirstLetter,
  handleChangeBorderColorAir,
  handleChangeColorAir,
  handleChangeDateTime,
  handleChangekm,
  handleChangeTemp,
  handleChoiceAir,
  handleDegWind,
  handleGetNowHour,
  removeDiacritics,
} from "../../utils/changeTemp";
import forecaseService from "../../services/forecasetService";
import LoadingReact from "../../components/LoadingReact";
import airPollutionService from "../../services/airService";
import InconService from "../../services/InconService";
import currentWeatherService from "../../services/currentWeather";
import addressService from "../../services/addressService";
const WeatherForecase = () => {
  const { state, county } = useParams();
  const navigate = useNavigate();
  const [currentWeather, setcurrentWeather] = useState<Partial<IWeatherData>>();
  const [forecaseWeather, setForecaseWeather] =
    useState<Partial<IWeatherForecast>>();
  const [loading, setLoading] = useState(true);
  const [airPollution, setAirPollution] = useState<Partial<IAirPollution>>();
  const loadData = async () => {
    try {
      const query = removeDiacritics(`${county}, ${state}, VN`);
      const addressRes: IAddress[] = await addressService.get(query);
      if (addressRes.length === 0) {
        return navigate("/page-Support");
      }

      const lat = addressRes[0].lat;
      const lon = addressRes[0].lon;
      // Chạy hai yêu cầu song song bằng Promise.all
      const [forecastRes, currentWeatherRes, airRes] = await Promise.allSettled(
        [
          forecaseService.get(lat, lon, 8),
          currentWeatherService.get(lat, lon),
          airPollutionService.getCurrent(lat, lon),
        ]
      );

      // Xử lý kết quả của cả hai yêu cầu
      if (forecastRes.status === "fulfilled")
        setForecaseWeather(forecastRes.value);
      if (currentWeatherRes.status === "fulfilled")
        setcurrentWeather(currentWeatherRes.value);
      if (airRes.status === "fulfilled") setAirPollution(airRes.value);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await loadData();
    };
    fetchData();
  }, []);
  return (
    <>
      {loading === false ? (
        <>
          <section className="mt-4">
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-8 ">
                  <Link
                    to={`/${state}/${county}/current-weather`}
                    className="text-decoration-none "
                  >
                    <div className="card mb-3 hover-shadow-lg">
                      <div className="card-header bg-white py-3">
                        <div className="row">
                          <div className="col">Thời thiết hiện tại</div>
                          <div className="col-auto col-md text-end">
                            {handleGetNowHour()}
                          </div>
                        </div>
                      </div>
                      <div className="row g-0">
                        <div className="col-12 col-md-4">
                          <div className="container">
                            <div className="row align-items-center">
                              <div className="col-6 col-md-12 text-nowrap ">
                                <div className="row">
                                  <div className="col">
                                    <img
                                      src={InconService.get(
                                        currentWeather?.weather
                                          ? currentWeather?.weather[0].icon
                                          : ""
                                      )}
                                      className="img-fluid"
                                      alt="logo"
                                    />
                                    <div className="d-inline fs-1 d-md-none">
                                      {handleChangeTemp(
                                        currentWeather?.main?.temp ?? 0
                                      )}
                                      °
                                      <span className="fs-6 text-secondary">
                                        c
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col d-none d-md-block">
                                    <div className="d-inline fs-1">
                                      {handleChangeTemp(
                                        currentWeather?.main?.temp ?? 0
                                      )}
                                      °
                                      <span className="fs-6 text-secondary">
                                        c
                                      </span>
                                    </div>
                                    <div>
                                      RealFeel{" "}
                                      {handleChangeTemp(
                                        currentWeather?.main?.feels_like ?? 0
                                      )}
                                      °
                                      <span className="fs-6 text-secondary">
                                        c
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-6 col-md-12 text-end text-md-start">
                                <strong>
                                  {capitalizeFirstLetter(
                                    currentWeather?.weather
                                      ? currentWeather?.weather[0].description
                                      : ""
                                  )}
                                </strong>
                                <p className="d-block d-md-none">
                                  RealFeel{" "}
                                  {handleChangeTemp(
                                    currentWeather?.main?.feels_like ?? 0
                                  )}
                                  °
                                </p>
                              </div>
                              <p className="d-none d-md-block">
                                Chi tiết thêm{" "}
                                <i className="fa-solid fa-greater-than"></i>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="d-none d-md-block col-md-8">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-12 ">
                                <div className="border-bottom border-1 border-black d-flex justify-content-between py-2">
                                  <span>Hướng gió</span>
                                  <span className="fw-bold">
                                    {handleDegWind(
                                      currentWeather?.wind?.deg ?? 0
                                    )}
                                  </span>
                                </div>
                              </div>
                              <div className="col-12 ">
                                <div className="border-bottom border-1 border-black d-flex justify-content-between py-2">
                                  <span>Gió giật mạnh</span>
                                  <span className="fw-bold">
                                    {handleChangekm(
                                      currentWeather?.wind?.speed ?? 0
                                    )}{" "}
                                    Km/h
                                  </span>
                                </div>
                              </div>
                              <div className="col-12 ">
                                <div className="border-bottom border-1 border-black d-flex justify-content-between py-2">
                                  <span>Chất lượng không khí</span>
                                  <span
                                    className={`text-${handleChangeColorAir(
                                      (airPollution?.list &&
                                        airPollution?.list[0].main.aqi) ??
                                        0
                                    )} fw-bold`}
                                  >
                                    {
                                      handleChoiceAir(
                                        (airPollution?.list &&
                                          airPollution?.list[0].main.aqi) ??
                                          0
                                      )[0]
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-3">
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-8">
                  <ul className="list-group">
                    <li
                      className="list-group-item disabled py-3"
                      aria-current="true"
                    >
                      Dự báo trong 24h
                    </li>
                    {forecaseWeather?.list?.map((item, index) => (
                      <li key={index} className="list-group-item">
                        <div className="row justify-content-center align-items-center">
                          <div className="col col-md-auto text-wrap ">
                            {handleChangeDateTime(new Date(item.dt_txt))}
                          </div>
                          <div className="col-auto">
                            <img
                              src={InconService.get(item.weather[0].icon)}
                              alt=""
                              height={"50px"}
                            />
                          </div>
                          <div className="col">
                            <span className="fs-5 fw-bold">
                              {handleChangeTemp(item.main.temp_max)}°
                            </span>
                            <span>{handleChangeTemp(item.main.temp_min)}</span>°
                          </div>
                          <div className="col text-end">
                            <i className="fa-solid fa-water"></i>{" "}
                            {item.main.humidity}%
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-5 pb-3">
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-8">
                  <Link
                    to={`/${state}/${county}/air-quality-index`}
                    className="text-decoration-none"
                  >
                    <div className="card hover-shadow-lg">
                      <div className="card-header bg-white py-3">
                        <div className="row">
                          <div className="col-auto">Chất lượng không khí</div>
                          <div className="col text-end">Xem thêm</div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="row mb-2">
                          <div className="col-auto col-md align-self-center py-2">
                            <i className="fa-solid fa-wind"></i> Chất lượng
                            không khí
                          </div>
                          <div
                            className={`col text-end align-self-center py-2   border-3 border-end ${handleChangeBorderColorAir(
                              (airPollution?.list &&
                                airPollution?.list[0].main.aqi) ??
                                0
                            )}`}
                          >
                            <strong>
                              {
                                handleChoiceAir(
                                  (airPollution?.list &&
                                    airPollution?.list[0].main.aqi) ??
                                    0
                                )[0]
                              }
                            </strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            {
                              handleChoiceAir(
                                (airPollution?.list &&
                                  airPollution?.list[0].main.aqi) ??
                                  0
                              )[1]
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <LoadingReact />
      )}
    </>
  );
};

export default WeatherForecase;
