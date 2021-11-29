const setTemperature = (value) => `${Math.round(value)}°`;
const setCloudiness = (value) => `${value}%`;
const setWind = (value) => `${Math.round(value)}m/s`;
const setHumidity = (value) => `${value}%`;

export const fetchData = async (requestType) => {
  const url = requestType;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    return alert(`Something went wrong. ${error}`);
  }
};

export const filterList = (list) => list.filter((_, index) => index % 8 === 0 && index < 25);

export const mapListToForecast = (list) =>
  list.map((listItem) => ({
    temperature: listItem.main.temp,
    cloudiness: listItem.clouds.all,
    wind: listItem.wind.speed,
    humidity: listItem.main.humidity,
    status: listItem.weather[0].description,
  }));

export const updatePage = ({ forecast, city }) => {
  const today = forecast[0];
  const tomorrow = forecast[1];
  const inTwoDays = forecast[2];
  const inThreeDays = forecast[3];

  document.getElementById("main-city").innerText = city;
  document.getElementById("main-status").innerText = today.status;

  document.getElementById("main-temperature").innerText = setTemperature(today.temperature);
  document.getElementById("tmw-temperature").innerText = setTemperature(tomorrow.temperature);
  document.getElementById("2-days-temperature").innerText = setTemperature(inTwoDays.temperature);
  document.getElementById("3-days-temperature").innerText = setTemperature(inThreeDays.temperature);

  document.getElementById("header-cloud").innerText = setCloudiness(today.cloudiness);
  document.getElementById("tmw-cloud").innerText = setCloudiness(tomorrow.cloudiness);
  document.getElementById("2-days-cloud").innerText = setCloudiness(inTwoDays.cloudiness);
  document.getElementById("3-days-cloud").innerText = setCloudiness(inThreeDays.cloudiness);

  document.getElementById("header-wind").innerText = setWind(today.wind);
  document.getElementById("tmw-wind").innerText = setWind(tomorrow.wind);
  document.getElementById("2-days-wind").innerText = setWind(inTwoDays.wind);
  document.getElementById("3-days-wind").innerText = setWind(inThreeDays.wind);

  document.getElementById("header-humidity").innerText = setHumidity(today.humidity);
  document.getElementById("tmw-humidity").innerText = setHumidity(tomorrow.humidity);
  document.getElementById("2-days-humidity").innerText = setHumidity(inTwoDays.humidity);
  document.getElementById("3-days-humidity").innerText = setHumidity(inThreeDays.humidity);
};
