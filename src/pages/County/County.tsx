import * as React from "react";
import { useState, useEffect } from "react";
import countyService from "../../services/countyService";
import { ICounty } from "../../types/types";
import { Link, useParams } from "react-router-dom";
import LoadingReact from "../../components/LoadingReact";
const County = () => {
  const [listCounty, setListCounty] = useState<ICounty[]>([]);
  const [loading, setLoading] = useState(true);
  const { name } = useParams();
  const loadData = async () => {
    try {
      await countyService.list(name).then((res) => setListCounty(res.data));
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
                  <div className="row">
                    <div className="col mb-3 bg-white py-3 ">
                      <Link
                        to={"/allState"}
                        className="text-decoration-none text-black"
                      >
                        Việt Nam
                      </Link>
                    </div>
                    <div className="col-12 mb-3">{name}</div>
                    <div className="col-12 p-0">
                      <div className="list-group">
                        {listCounty.map((item) => (
                          <Link
                            to={`/${item.state.name}/${item.state.name}/weather-forecast`}
                            className="list-group-item list-group-item-action py-3"
                            aria-current="true"
                          >
                            {item.name}
                          </Link>
                        ))}
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

export default County;
