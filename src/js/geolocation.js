import { fetchData, filterList, mapListToForecast, updatePage } from "./utils.js";
import { apiKey, baseUrl } from "./constants.js";

const getGeolocationUrl = (latitude, longitude) =>
  `${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

const getGeolocationError = () => alert(`Unable to retrieve your location.`);

const handleSetDataFromGeolocation = async (position) => {
  const { latitude, longitude } = position.coords;
  const { list, city } = await fetchData(getGeolocationUrl(latitude, longitude));
  const filteredList = filterList(list);
  const forecast = mapListToForecast(filteredList);
  updatePage({ forecast, city: city.name });
};

if (!navigator.geolocation) {
  alert(`Geolocation is not supported by your browser`);
} else {
  navigator.geolocation.getCurrentPosition(handleSetDataFromGeolocation, getGeolocationError);
}