import { fetchData, filterList, mapListToForecast, updatePage } from "./utils.js";
import { apiKey, baseUrl } from "./constants.js";

const searchElement = document.getElementById("search");

const getUrl = () => {
  const city = document.getElementById("city").value;
  return `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;
};

const handleSearch = async (event) => {
  event.preventDefault();
  const { list, city } = await fetchData(getUrl());
  const filteredList = filterList(list);
  const forecast = mapListToForecast(filteredList);
  updatePage({ forecast, city: city.name });
  return searchElement.reset();
};

searchElement.addEventListener("submit", handleSearch);
