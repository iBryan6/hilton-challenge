import { useState, useRef } from "react";
import CityWeather from "../components/city-weather";

const API_KEY = "b07c6aae9638d6fea029603bf5d20c78";

function IndexPage() {
  const [city, setCity] = useState<string | null>("");
  const [weatherResult, setWeatherResult] = useState<object | null>({});
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchWeatherResult = () => {
    city &&
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
        .then((r) => r.json())
        .then((result) => {
          setWeatherResult(result);
          setSearched(true);
          setCity("");
        });
  };

  const handleInputChange = (e: any) => {
    setCity(e.target.value.toString());
  };

  const handleFormSubmit = (e: any) => {
    fetchWeatherResult();
    e.preventDefault();
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="h-screen py-2 bg-gray-200">
      <form
        className="flex items-center justify-center px-5"
        onSubmit={handleFormSubmit}
      >
        <span className="font-medium" onClick={focusInput}>
          Weather Search:
        </span>
        <input
          data-testid="weather-input"
          className="ml-2 shadow-sm py-2 border-gray-400 rounded-l-md"
          type="text"
          name="city"
          value={city}
          onChange={handleInputChange}
          ref={inputRef}
          aria-label="weather-search-input"
          aria-required="true"
        />
        <button
          className="px-2 py-2 bg-blue-600 text-white font-bold rounded-r-md"
          type="submit"
        >
          SUBMIT
        </button>
      </form>

      <div className="mt-4">
        {searched && <CityWeather weatherResult={weatherResult} />}
      </div>
    </div>
  );
}

export default IndexPage;
