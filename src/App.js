import React, { useEffect, useState } from "react";
import "./App.css";
import search from "./images/search.svg";

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
        setPlaceInfo({
          name: data.name,
          icon: data.weather[0].icon,
          description: data.weather[0].description,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          wind: data.wind.speed,
        });
        setPlace("");
      });
  };

  console.log(placeInfo);
  return (
    <section
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
            <img src={search} alt="search" />
          </button>
        </div>
        <div className="weather-container">
          <h2 className="city">Weather in {placeInfo.name}</h2>
          <div className="temp">{placeInfo.temperature?.toFixed(0)}°C</div>
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
    </section>
  );
}

export default App;
