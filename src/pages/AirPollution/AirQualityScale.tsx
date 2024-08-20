import * as React from "react";
import { useState } from "react";
import { handleChoiceAir } from "../../utils/changeTemp";
const AirQuantityScale = () => {
  const renderAirQualityScale = () => {
    const elements = [];

    for (let i = 1; i <= 5; i++) {
      elements.push(
        <div key={i + 1} className="col">
          <div className="row g-2">
            <div className="col">{handleChoiceAir(i)[0]}</div>
            <div className="col-auto text-end">{i}</div>
            <div className="col-12">{handleChoiceAir(i)[1]}</div>
          </div>
          <hr />
        </div>
      );
    }
    return elements;
  };
  return (
    <>
      <div className="row row-cols-1 g-3">{renderAirQualityScale()}</div>
    </>
  );
};

export default AirQuantityScale;
