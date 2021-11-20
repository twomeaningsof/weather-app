const apiKey = "56316389de29eb42a940d374da953aa8";
const searchElement = document.getElementById('search');

const updatePage = (forecast) => {
  document.getElementById('header-cloud').innerText = `${forecast[0][1]}%`;
  document.getElementById('header-wind').innerText = `${Math.round(forecast[0][2])}m/s`;
  document.getElementById('header-humidity').innerText = `${forecast[0][3]}%`;
  document.getElementById('main-city').innerText = forecast[0][4];
  document.getElementById('main-status').innerText = forecast[0][5];
  document.getElementById('main-temperature').innerText = `${Math.round(forecast[0][0])}°`;
  document.getElementById('tmw-temperature').innerText = `${Math.round(forecast[1][0])}°`;
  document.getElementById('tmw-cloud').innerText = `${forecast[1][1]}%`;
  document.getElementById('tmw-wind').innerText = `${Math.round(forecast[1][2])}m/s`;
  document.getElementById('tmw-humidity').innerText = `${forecast[1][3]}%`;
  document.getElementById('2-days-temperature').innerText = `${Math.round(forecast[2][0])}°`;
  document.getElementById('2-days-cloud').innerText = `${forecast[2][1]}%`;
  document.getElementById('2-days-wind').innerText = `${Math.round(forecast[2][2])}m/s`;
  document.getElementById('2-days-humidity').innerText = `${forecast[2][3]}%`;
  document.getElementById('3-days-temperature').innerText = `${Math.round(forecast[3][0])}°`;
  document.getElementById('3-days-cloud').innerText = `${forecast[3][1]}%`;
  document.getElementById('3-days-wind').innerText = `${Math.round(forecast[3][2])}m/s`;
  document.getElementById('3-days-humidity').innerText = `${forecast[3][3]}%`;
}

const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    let forecast = [];
    for (let i = 0; i<25; i += 8) {
        const temperature = data.list[i].main.temp;
        const cloudiness = data.list[i].clouds.all;
        const wind = data.list[i].wind.speed;
        const humidity = data.list[i].main.humidity;
        const city = data.city.name;
        const status = data.list[i].weather[0].description;
        forecast.push([temperature, cloudiness, wind, humidity, city, status]);
      }
    return updatePage(forecast);
  } catch (error) {
    return alert(`Something went wrong. ${error}`)
  }
}


const getUrl = (e) => {
  e.preventDefault();
  let city = document.getElementById('city').value;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  searchElement.reset();
  console.log(`getUrl: ${url}`);
  return fetchData(url);
}

searchElement.addEventListener('submit', getUrl);
