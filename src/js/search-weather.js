const apiKey = "56316389de29eb42a940d374da953aa8";
const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast'
const searchElement = document.getElementById('search');

const setTemperature = (value) => `${Math.round(value)}°`;
const setCloudiness = (value) => `${value}%`;
const setWind = (value) => `${Math.round(value)}m/s`;
const setHumidity = (value) => `${value}%`;

const getUrl = () => {
  const city = document.getElementById('city').value;
  return `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;
}

const fetchData = async () => {
  const url = getUrl();

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    return alert(`Something went wrong. ${error}`)
  }
}

const filterData = (data) => [[data.list[0],data.list[8],data.list[16],data.list[24]],data.city.name]

const mapDataToForecast = (data) => data[0].map(listItem => ({
  temperature: listItem.main.temp,
  cloudiness: listItem.clouds.all,
  wind: listItem.wind.speed,
  humidity: listItem.main.humidity,
  status: listItem.weather[0].description,
  city: data[1]
}))

const updatePage = (forecast) => {
  const today = forecast[0];
  const tomorrow = forecast[1];
  const inTwoDays = forecast[2];
  const inThreeDays = forecast[3];

  document.getElementById('main-city').innerText = today.city;
  document.getElementById('main-status').innerText = today.status;

  document.getElementById('main-temperature').innerText = setTemperature(today.temperature)
  document.getElementById('tmw-temperature').innerText = setTemperature(tomorrow.temperature);
  document.getElementById('2-days-temperature').innerText = setTemperature(inTwoDays.temperature);
  document.getElementById('3-days-temperature').innerText = setTemperature(inThreeDays.temperature);

  document.getElementById('header-cloud').innerText = setCloudiness(today.cloudiness);
  document.getElementById('tmw-cloud').innerText = setCloudiness(tomorrow.cloudiness);
  document.getElementById('2-days-cloud').innerText = setCloudiness(inTwoDays.cloudiness);
  document.getElementById('3-days-cloud').innerText = setCloudiness(inThreeDays.cloudiness);

  document.getElementById('header-wind').innerText = setWind(today.wind);
  document.getElementById('tmw-wind').innerText = setWind(tomorrow.wind);
  document.getElementById('2-days-wind').innerText = setWind(inTwoDays.wind);
  document.getElementById('3-days-wind').innerText = setWind(inThreeDays.wind);

  document.getElementById('header-humidity').innerText = setHumidity(today.humidity)
  document.getElementById('tmw-humidity').innerText = setHumidity(tomorrow.humidity)
  document.getElementById('2-days-humidity').innerText = setHumidity(inTwoDays.humidity)
  document.getElementById('3-days-humidity').innerText = setHumidity(inThreeDays.humidity)
}

const handleSearch = async (event) => {
  event.preventDefault();
  const data = await fetchData();
  const filteredData = filterData(data);
  const forecast = mapDataToForecast(filteredData);
  updatePage(forecast);
  return searchElement.reset();
}

searchElement.addEventListener('submit', handleSearch);