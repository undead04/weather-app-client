import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IAddress, IAirPollution } from "../../types/types";
import airPollutionService from "../../services/airService";
import {
  handleChangeBorderColorAir,
  handleChangeDateTime,
  handleChoiceAir,
  handleConvertUNIX,
  removeDiacritics,
} from "../../utils/changeTemp";
import LoadingReact from "../../components/LoadingReact";
import AirPolutionDetail from "./AirPolutionDetail";
import AirQuantityScale from "./AirQualityScale";
import addressService from "../../services/addressService";
import forecastService from "../../services/forecasetService";
const AirPollution = () => {
  const { state, county } = useParams();
  const [loading, setLoading] = useState(true);
  const [airPollution, setAirPollution] = useState<Partial<IAirPollution>>({});
  const [forecaseAir, setForecaseAir] = useState<Partial<IAirPollution>>();
  const [indexPage, setindexPage] = useState<number>(1);
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
      const newDate = new Date();
      const start = handleConvertUNIX(newDate);
      const end = handleConvertUNIX(
        new Date(newDate.getTime() + 24 * 60 * 60 * 1000)
      );
      if (lat && lon) {
        // Chạy hai yêu cầu song song bằng Promise.all
        const [currentAirRes, forecaseAirRes] = await Promise.allSettled([
          airPollutionService.getCurrent(lat, lon),
          airPollutionService.getForecase(lat, lon, start, end),
        ]);

        // Xử lý kết quả của cả hai yêu cầu
        if (currentAirRes.status === "fulfilled")
          setAirPollution(currentAirRes.value);
        if (forecaseAirRes.status === "fulfilled")
          setForecaseAir(forecaseAirRes.value);
      }
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
  const handleChangeIndexPage = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: number
  ) => {
    event.preventDefault();
    setindexPage(index);
  };
  return (
    <>
      {loading === false ? (
        <>
          <section className="mt-3">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-8">
                  <div className="card hover-shadow-lg">
                    <div className="card-header bg-white py-3">
                      <div className="row">
                        <div className="col-auto">
                          Chất lượng không khí hiện tại
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row mb-2">
                        <div className="col-12">
                          <p className="fs-4 text-secondary mb-0">H.NAY</p>
                          <p>
                            {handleChangeDateTime(new Date()).split(" ")[0]}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-6 text-center align-self-center">
                          <p className="mb-0 fs-3 fw-bold">
                            {airPollution?.list &&
                              airPollution?.list[0].main.aqi}
                          </p>
                          <small className="text-secondary">AQI</small>
                        </div>
                        <div className="col-12 col-md-6">
                          <div
                            className="border border-2 border-success mb-3"
                            style={{ width: "50px" }}
                          ></div>
                          <p className="fs-4">
                            {
                              handleChoiceAir(
                                (airPollution?.list &&
                                  airPollution?.list[0].main.aqi) ??
                                  0
                              )[0]
                            }
                          </p>
                          <p>
                            {
                              handleChoiceAir(
                                (airPollution?.list &&
                                  airPollution?.list[0].main.aqi) ??
                                  0
                              )[1]
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-3">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-8">
                  <div className="card">
                    <div className="card-header bg-white py-3">
                      <div className="row">
                        <div className="col-auto">
                          <ul className="nav nav-underline">
                            <li className="nav-item">
                              <a
                                className={`nav-link text-black ${
                                  indexPage == 1 && "active"
                                }`}
                                aria-current="page"
                                href="#"
                                onClick={() => setindexPage(1)}
                              >
                                Chất ô nhiểm hiện tại
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className={`nav-link text-black ${
                                  indexPage == 2 && "active"
                                }`}
                                href="#"
                                onClick={() => setindexPage(2)}
                              >
                                Thang đo chất lượng không khí
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="col text-end d-none align-self-center d-lg-block">
                          Trong giờ vừa rồi
                        </div>
                      </div>
                    </div>
                    <div className="card-body ">
                      {indexPage === 1 ? (
                        <AirPolutionDetail
                          components={
                            airPollution.list
                              ? airPollution.list[0].components
                              : undefined
                          }
                        />
                      ) : (
                        <AirQuantityScale />
                      )}
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

export default AirPollution;
