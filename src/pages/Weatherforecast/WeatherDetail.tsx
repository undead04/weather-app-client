import { useState, useEffect } from "react";
import {
  capitalizeFirstLetter,
  handleChangekm,
  handleChangeTemp,
  handleConvertMtoKm,
  handleDegWind,
  handleGetNowHour,
  removeDiacritics,
} from "../../utils/changeTemp";
import InconService from "../../services/InconService";
import { IAddress, IWeatherData } from "../../types/types";
import { useNavigate, useParams } from "react-router-dom";
import LoadingReact from "../../components/LoadingReact";
import currentWeatherService from "../../services/currentWeather";
import addressService from "../../services/addressService";
const WeatherDetail = () => {
  const [currentWeather, setcurrentWeather] = useState<Partial<IWeatherData>>();
  const [loading, setLoading] = useState(true);
  const { state, county } = useParams();
  const navigate = useNavigate();
  const loadData = async () => {
    try {
      const query = removeDiacritics(`${county}, ${state}, VN`);
      const addressRes: IAddress[] = await addressService.get(query);
      if (addressRes.length === 0) {
        return navigate("/page-Support");
      }
      const lat = addressRes[0].lat;
      const lon = addressRes[0].lon;
      const [currentWeatherRes] = await Promise.allSettled([
        currentWeatherService.get(lat, lon),
      ]);

      // Xử lý kết quả của cả hai yêu cầu
      if (currentWeatherRes.status === "fulfilled")
        setcurrentWeather(currentWeatherRes.value);
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
          <section className="mt-3">
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-8">
                  <div className="card">
                    <div className="card-header bg-white py-3">
                      <div className="row">
                        <div className="col-auto col-md">
                          Thời tiết hiện tại
                        </div>
                        <div className="col text-end">{handleGetNowHour()}</div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <img
                            src={InconService.get(
                              currentWeather?.weather
                                ? currentWeather?.weather[0].icon
                                : ""
                            )}
                            className="img-fluid"
                            alt="logo"
                          />
                          <div className="d-inline fs-1">
                            {handleChangeTemp(currentWeather?.main?.temp ?? 0)}°
                            <span className="fs-6 text-secondary">c</span>
                          </div>
                        </div>
                        <div className="col-6">
                          <p className="">
                            RealFeel{" "}
                            {handleChangeTemp(
                              currentWeather?.main?.feels_like ?? 0
                            )}
                            °
                          </p>
                          <p>
                            Áp suất ở mặt đất:{" "}
                            {currentWeather?.main?.grnd_level} hPa
                          </p>
                        </div>
                        <div className="col-12">
                          {capitalizeFirstLetter(
                            (currentWeather?.weather &&
                              currentWeather?.weather[0].description) ??
                              ""
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <p className="d-flex justify-content-between mb-0">
                            Độ ẩm <span>{currentWeather?.main?.humidity}%</span>
                          </p>
                          <hr />
                        </div>
                        <div className="col-12 col-md-6">
                          <p className="d-flex justify-content-between mb-0">
                            Áp suất khí quyển{" "}
                            <span>{currentWeather?.main?.pressure} hPa</span>
                          </p>
                          <hr />
                        </div>
                        <div className="col-12 col-md-6">
                          <p className="d-flex justify-content-between">
                            Áp suất ở mực nước biển{" "}
                            <span>{currentWeather?.main?.sea_level} hPa.</span>
                          </p>
                          <hr />
                        </div>
                        <div className="col-12 col-md-6">
                          <p className="d-flex justify-content-between">
                            Nhiệt độ tối đa{" "}
                            <span>
                              {handleChangeTemp(
                                currentWeather?.main?.temp_max ?? 0
                              )}
                              °
                            </span>
                          </p>
                          <hr />
                        </div>
                        <div className="col-12 col-md-6">
                          <p className="d-flex justify-content-between">
                            Nhiệt độ tối thiểu{" "}
                            <span>
                              {handleChangeTemp(
                                currentWeather?.main?.temp_min ?? 0
                              )}
                              °
                            </span>
                          </p>
                          <hr />
                        </div>
                        <div className="col-12 col-md-6">
                          <p className="d-flex justify-content-between">
                            Tầm nhìn xa{" "}
                            <span>
                              {handleConvertMtoKm(
                                currentWeather?.visibility ?? 0
                              )}
                              Km
                            </span>
                          </p>
                          <hr />
                        </div>
                        <div className="col-12 col-md-6">
                          <p className="d-flex justify-content-between">
                            Tốc độ gió{" "}
                            <span>
                              {handleChangekm(currentWeather?.wind?.speed ?? 0)}
                              Km/h
                            </span>
                          </p>
                          <hr />
                        </div>
                        <div className="col-12 col-md-6">
                          <p className="d-flex justify-content-between">
                            Hướng gió{" "}
                            <span>
                              {handleDegWind(currentWeather?.wind?.deg ?? 0)}
                              Km/h
                            </span>
                          </p>
                          <hr />
                        </div>
                        <div className="col-12 col-md-6">
                          <p className="d-flex justify-content-between">
                            Lượng mưa trong 1 giờ{" "}
                            <span>
                              {currentWeather?.rain?.["1h"]}
                              mm/h
                            </span>
                          </p>
                          <hr />
                        </div>
                        <div className="col-12 col-md-6">
                          <p className="d-flex justify-content-between">
                            Mây <span>{currentWeather?.clouds?.all}%</span>
                          </p>
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
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

export default WeatherDetail;
