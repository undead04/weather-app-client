import * as React from "react";
import { useState, useEffect } from "react";
import stateService from "../../services/stateService";
import { IState } from "../../types/types";
import LoadingReact from "../../components/LoadingReact";
import { Link } from "react-router-dom";
const AllState = () => {
  const [listState, setListState] = useState<IState[]>([]);
  const [loading, setLoading] = useState(true);
  const loadData = async () => {
    try {
      await stateService.list().then((res) => setListState(res.data));
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
                <div className="col-12 mb-3">VIỆT NAM</div>
              </div>
              <div className="row">
                <div className="col-12 col-lg-8">
                  <div className="list-group">
                    {listState.map((item, index) => (
                      <Link
                        to={`/allState/${item.name}`}
                        className="list-group-item list-group-item-action py-3"
                        aria-current="true"
                        key={index}
                      >
                        {item.name}
                      </Link>
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

export default AllState;
