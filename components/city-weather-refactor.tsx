import React, { memo } from "react";

function CityWeather(props: any) {
  const { weatherResult } = props;

  const KtoF = (tempKelvin: number) => {
    return ((tempKelvin - 273.15) * 9) / 5 + 32;
  };

  const displayIcon = () => {
    let cityWeatherIcon: string = weatherResult.weather[0].icon;
    let cityDescription: string = weatherResult.weather[0].description;
    let cityName: string = weatherResult.name;

    return (
      <img
        src={`http://openweathermap.org/img/wn/${cityWeatherIcon}@2x.png`}
        alt={cityDescription + " in " + cityName}
        width="100"
        height="100"
        className="mx-auto"
      />
    );
  };

  return (
    <div
      data-testid="weather-city-info-container"
      className="flex flex-col items-center mt-12"
    >
      {weatherResult.cod === 200 ? (
        <div className="bg-white w-96 shadow-lg rounded-lg p-5">
          <h1 className="text-2xl font-bold text-center text-gray-700">
            {weatherResult.name.toUpperCase()}
          </h1>
          {displayIcon()}
          <p
            data-testid="weather-city-description"
            className="text-center text-gray-600 font-medium text-lg"
          >
            {weatherResult.weather[0].description}
          </p>
          <div className="font-medium text-4xl">
            <sub className="text-gray-600 text-sm">Temperature:</sub>{" "}
            {KtoF(weatherResult.main.temp).toFixed(0)} &#8457;
          </div>
        </div>
      ) : (
        <h1 className="text-2xl font-bold text-center text-gray-700">
          NO RESULTS!
        </h1>
      )}
    </div>
  );
}

export default memo(CityWeather);
