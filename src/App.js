import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [place, setPlace] = useState("London");
  const [placeInfo, setPlaceInfo] = useState({});
  let API = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=ac8ca00cb1e106bf3a5f83ee3a43a6ec`;

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    fetch(API)
      .then((response) => {
        if (!response.ok) return alert("Please enter a valid city!");
        return response.json();
      })
      .then((data) => {
        console.log(placeInfo);
        setPlaceInfo({
          name: data.name,
          icon: data.weather[0].icon,
          description: data.weather[0].description,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          wind: data.wind.speed,
        });
      });
  };
  return (
    <body
      style={{
        backgroundImage: `url('https://source.unsplash.com/1600x900/?${placeInfo.name}')`,
      }}
    >
      <div className="App">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleFetch();

                e.target.blur();
              }
            }}
          />
          <button onClick={handleFetch}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="1.5em"
              width="1.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
            </svg>
          </button>
        </div>
        <div className="weather-container">
          <h2 className="city">Weather in {placeInfo.name}</h2>
          <div className="temp">{placeInfo.temperature?.toFixed()}°C</div>
          <div className="imgPlusDes">
            <img
              className="icon"
              src={`https://openweathermap.org/img/wn/${placeInfo.icon}.png`}
              alt="logo"
            />
            <div className="description">{placeInfo.description}</div>
          </div>
          <div className="humidity">Humidity: {placeInfo.humidity}%</div>
          <div className="wind">Wind speed: {placeInfo.wind} km/h</div>
        </div>
      </div>
    </body>
  );
}

export default App;
