import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IAirPollution } from "../../types/types";
import airPollutionService from "../../services/airService";
import { handleChangeDateTime, handleChoiceAir } from "../../utils/changeTemp";
import LoadingReact from "../../components/LoadingReact";
import AirPolutionDetail from "./AirPolutionDetail";
import AirQuantityScale from "./AirQualityScale";
import TabReact from "../../components/TabReact";
const AirPollution = () => {
  const { state, county } = useParams();
  const [loading, setLoading] = useState(true);
  const [airPollution, setAirPollution] = useState<Partial<IAirPollution>>({});
  const [indexPage, setindexPage] = useState<number>(1);
  const navigate = useNavigate();
  const loadData = async () => {
    try {
      const [currentAirRes] = await Promise.allSettled([
        airPollutionService.getCurrent(state ?? "", county ?? ""),
      ]);

      // Xử lý kết quả của cả hai yêu cầu
      if (currentAirRes.status === "fulfilled")
        setAirPollution(currentAirRes.value);
      else {
        console.log(currentAirRes.reason);
        if (currentAirRes.reason.response.data.status === 429) {
          navigate("/finishService");
        } else {
          navigate("/page-Support");
        }
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
              <div className="row mb-3">
                <div className="col-12">
                  <TabReact
                    component={[
                      {
                        lable: "Hôm nay",
                        link: `/${state}/${county}/weather-forecast`,
                        current: 1,
                      },
                      {
                        lable: "Chất lượng không khí",
                        link: `/${state}/${county}/air-quality-index`,
                        current: 2,
                      },
                    ]}
                    currentTab={2}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col fs-5">{`${county}, ${state}`}</div>
              </div>
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
          <section className="mt-3 pb-3">
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
                                onClick={(e) => handleChangeIndexPage(e, 1)}
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
                                onClick={(e) => handleChangeIndexPage(e, 2)}
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
