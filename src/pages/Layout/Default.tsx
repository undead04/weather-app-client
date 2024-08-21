import * as React from "react";
import { useState } from "react";
import Header from "./Header";
import Home from "../Home/Home";
import { Route, Routes } from "react-router-dom";
import WeatherForecase from "../Weatherforecast/WeatherForecast";
import WeatherDetail from "../Weatherforecast/WeatherDetail";
import AirPollution from "../AirPollution/AirPollution";
import AllState from "../AllState/AllState";
import County from "../County/County";
import NotFound from "../notFound/NotFound";
import PageSupport from "../notFound/PageSupport";
const Default = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/:state/:county/current-weather"
          element={<WeatherDetail />}
        />
        <Route
          path="/:state/:county/weather-forecast"
          element={<WeatherForecase />}
        />
        <Route
          path="/:state/:county/air-quality-index"
          element={<AirPollution />}
        />
        <Route path="/allState" element={<AllState />} />
        <Route path="/allState/:name" element={<County />} />
        <Route path="/page-Support" element={<PageSupport />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Default;
