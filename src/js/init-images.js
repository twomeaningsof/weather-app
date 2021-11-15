import cloud from '../img/cloud.png'
import wind from '../img/wind.png'
import humidity from '../img/humidity.png'

const assignImage = (element, image) => {
  return element.src = image;
}

//"Catch" <img> elements
const cloudElements = document.querySelectorAll('.cloud-img');
const humidityElements = document.querySelectorAll('.humidity-img');
const windElements = document.querySelectorAll('.wind-img');

//Assign to every element its proper image
cloudElements.forEach( element => assignImage(element, cloud));
humidityElements.forEach( element => assignImage(element, humidity));
windElements.forEach( element => assignImage(element, wind));
