import { fetchData, changeBackground, filterList, mapListToForecast, updatePage } from "./utils.js";
import { apiKey, baseUrl } from "./constants.js";

const searchElement = document.getElementById("search");

const getUrl = () => {
  const city = document.getElementById("city").value;
  return `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;
};

const handleSearch = async (event) => {
  event.preventDefault();
  localStorage.removeItem("city");

  const {
    list,
    city: { timezone, sunrise, sunset, name: city },
  } = await fetchData(getUrl());
  const [{ dt: currentTime }] = list;
  const filteredList = filterList(list);
  const forecast = mapListToForecast(filteredList);

  localStorage.setItem("city", city);
  updatePage({ forecast, city });
  changeBackground(currentTime, timezone, sunrise, sunset);
  return searchElement.reset();
};

searchElement.addEventListener("submit", handleSearch);
