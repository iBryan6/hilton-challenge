import React, { memo } from "react";

function CityWeather(props: any) {
  const { weatherResult } = props;

  const KtoF = (tempKelvin: number) => {
    return ((tempKelvin - 273.15) * 9) / 5 + 32;
  };

  const displayIcon = () => {
    let icon = weatherResult.weather[0].icon;
    let description = weatherResult.weather[0].description;

    return (
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        width="100"
        height="100"
        className="mx-auto"
      />
    );
  };

  return (
    <>
      {weatherResult.cod === 200 ? (
        <div className="h-screen flex flex-col items-center mt-12">
          <div className="bg-white w-96 shadow-lg rounded-lg p-5">
            <h1 className="text-2xl font-bold text-center text-gray-700">
              {weatherResult.name.toUpperCase()}
            </h1>
            {displayIcon()}
            <p className="text-center text-gray-600 font-medium text-lg">
              {weatherResult.weather[0].description}
            </p>
            <div className="font-medium text-4xl">
              <sub className="text-gray-600 text-sm">Temperature:</sub>{" "}
              {KtoF(weatherResult.main.temp).toFixed(0)} &#8457;
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-2xl font-bold text-center text-gray-700">
          NO RESULTS!
        </h1>
      )}
    </>
  );
}

export default memo(CityWeather);
