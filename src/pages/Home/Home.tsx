import * as React from "react";
import { useState, useEffect } from "react";
import { IAddress, ICounty, IWeatherCounty } from "../../types/types";
import { Link, useNavigate } from "react-router-dom";
import countyService from "../../services/countyService";
import addressService from "../../services/addressService";
import { handleChangeTemp, removeDiacritics } from "../../utils/changeTemp";
import currentWeatherService from "../../services/currentWeather";
import LoadingReact from "../../components/LoadingReact";
import InconService from "../../services/InconService";
const Home = () => {
  const [listAddress, setListAddress] = useState<Partial<ICounty[]>>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [listWeatherCounty, setListWeatherCounty] = useState<IWeatherCounty[]>(
    []
  );
  const [listCounty, setlistCounty] = useState<ICounty[]>([]);
  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    // Nếu có timeout trước đó, xóa nó
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (value.length > 0) {
      // Tạo timeout để trì hoãn việc gọi API
      const newTimeoutId = setTimeout(() => {
        handleSearch(value);
      }, 500); // 300ms sau khi người dùng dừng gõ

      setTimeoutId(newTimeoutId);
    } else {
      setListAddress([]);
    }
  };
  const handleSearch = async (query: string) => {
    if (query) {
      await countyService
        .list(query, undefined, undefined, 4)
        .then((res) => setListAddress(res.data));
    } else {
      setListAddress([]);
    }
  };
  const loadData = async () => {
    try {
      const countyRes = await countyService.listRandom();
      setlistCounty(countyRes);
      let addressRes = await Promise.allSettled(
        countyRes.map(async (item) => {
          const query = removeDiacritics(`${item.name}, ${item.state.name},VN`);
          return addressService.get(query).then((res) => res[0]);
        })
      );

      // Lọc các kết quả thành công và lấy dữ liệu thời tiết
      const weatherRes: IWeatherCounty[] = await Promise.all(
        addressRes
          .filter(
            (result): result is PromiseFulfilledResult<IAddress> =>
              result.status === "fulfilled" && result.value != undefined
          )
          .map(async (item) => {
            console.log(item);
            const lat = item.value.lat;
            const lon = item.value.lon;
            const weatherData = await currentWeatherService.get(lat, lon);
            // Type assertion (use with caution)
            return {
              weather: weatherData,
              county: item.value,
            } as IWeatherCounty;
          })
      );
      setListWeatherCounty(weatherRes);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (listCounty.length === 0) {
      const fetchData = async () => {
        await loadData();
      };
      fetchData();
    }
  }, [listCounty]);
  return (
    <>
      {loading === false ? (
        <>
          <section className="backgroundImage">
            <div className="container h-100">
              <div className="row h-100">
                <div className="col-12 col-lg-6 offset-lg-3 align-self-center">
                  <div className="position-relative">
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </span>
                      <input
                        type="search"
                        className="form-control"
                        onChange={handleInputChange}
                        placeholder="Search your Address, City or Code Zip"
                        aria-label="Search your Address, City or Code Zip"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    {listAddress.length > 0 ? (
                      <div className="position-absolute w-100 mt-3">
                        <div className="list-group">
                          {listAddress.map((item, index) => (
                            <Link
                              to={`/${item?.state.name}/${item?.name}/weather-forecast`}
                              className="list-group-item list-group-item-action border-bottom-0"
                              aria-current="true"
                              key={index}
                            >
                              <p className="m-0 fs-5">
                                <strong>{item?.name}</strong>
                              </p>
                              <small>{item?.state.name}</small>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-4 pb-5">
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-8">
                  <div className="row mb-3">
                    <div className="col">Việt nam với điều kiện thời tiết</div>
                    <div className="col-auto text-end">
                      <Link to={"/AllState"} className="text-decoration-none">
                        <strong>Xem thêm</strong>
                      </Link>
                    </div>
                  </div>
                  <div className="row g-3 ">
                    {listWeatherCounty.map((item, index) => (
                      <div className="col-12 col-md-6" key={index}>
                        <Link
                          to={`/${
                            listCounty.find(
                              (county) => county.name == item.county.name
                            )?.state.name
                          }/${
                            listCounty.find(
                              (county) => county.name == item.county.name
                            )?.name
                          }/weather-forecast`}
                          className="text-black text-decoration-none"
                        >
                          <div className="row me-1 bg-white justify-content-center py-3">
                            <div className="col align-self-center">
                              {item.county.local_names?.vi}
                            </div>
                            <div className="col-auto align-self-center">
                              <img
                                src={InconService.get(
                                  item.weather.weather[0].icon
                                )}
                                alt=""
                                height={"50px"}
                              />
                            </div>
                            <div className="col-auto text-end align-self-center">
                              {handleChangeTemp(item.weather.main.temp)}°
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
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

export default Home;
