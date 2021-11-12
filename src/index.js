import "./style/index.scss"
import cloud from './img/cloud.png'
import wind from './img/wind.png'
import humidity from './img/humidity.png'

// "Catch" <img> elements
const headerCloudElement = document.getElementById('header-cloud')
const headerHumidityElement = document.getElementById('header-humidity')
const headerWindElement = document.getElementById('header-wind')
const tmwCloudElement = document.getElementById('tmw-cloud')
const tmwHumidityElement = document.getElementById('tmw-humidity')
const tmwWindElement = document.getElementById('tmw-wind')
const twoCloudElement = document.getElementById('two-days-cloud')
const twoHumidityElement = document.getElementById('two-days-humidity')
const twoWindElement = document.getElementById('two-days-wind')
const threeCloudElement = document.getElementById('three-days-cloud')
const threeHumidityElement = document.getElementById('three-days-humidity')
const threeWindElement = document.getElementById('three-days-wind')

// Assign src attribute to the <img> elements
headerCloudElement.src = cloud
headerHumidityElement.src = humidity
headerWindElement.src = wind
tmwCloudElement.src = cloud
tmwHumidityElement.src = humidity
tmwWindElement.src = wind
twoCloudElement.src = cloud
twoHumidityElement.src = humidity
twoWindElement.src = wind
threeCloudElement.src = cloud
threeHumidityElement.src = humidity
threeWindElement.src = wind