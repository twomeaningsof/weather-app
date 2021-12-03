import { fetchData, changeBackground, filterList, mapListToForecast, updatePage } from "./utils.js";
import { apiKey, baseUrl } from "./constants.js";

const getUrlOnGeolocation = (latitude, longitude) =>
  `${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

const getUrlOnLocalStorage = () =>
  `${baseUrl}?q=${localStorage.getItem("city")}&appid=${apiKey}&units=metric`;

const searchOnLocalStorage = async () => {
  const {
    list,
    city: { timezone, sunrise, sunset, name: city },
  } = await fetchData(getUrlOnLocalStorage());
  const [{ dt: currentTime }] = list;
  const filteredList = filterList(list);
  const forecast = mapListToForecast(filteredList);

  updatePage({ forecast, city });
  changeBackground(currentTime, timezone, sunrise, sunset);
};

const getGeolocationError = () => {
  alert(`Unable to retrieve your location with geolocation.`);
  searchOnLocalStorage();
};

const searchOnGeolocation = async (position) => {
  const { latitude, longitude } = position.coords;
  const {
    list,
    city: { timezone, sunrise, sunset, name: city },
  } = await fetchData(getUrlOnGeolocation(latitude, longitude));
  const [{ dt: currentTime }] = list;
  const filteredList = filterList(list);
  const forecast = mapListToForecast(filteredList);

  updatePage({ forecast, city });
  changeBackground(currentTime, timezone, sunrise, sunset);
};

if (!navigator.geolocation) {
  alert(`Geolocation is not supported by your browser`);
} else {
  navigator.geolocation.getCurrentPosition(searchOnGeolocation, getGeolocationError);
}
