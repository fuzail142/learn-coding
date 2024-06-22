const API_KEY = `cc595737c864496f4ab7ca2d610f8d97`
const form = document.querySelector("form")
const search = document.querySelector("#search")
const weather = document.querySelector("#weather")
//  const API = `https://api.openweathermap.org/data/2.5/weather?  q=${city}&appid=${API_KEY}&units=metric`
//  const IMG_URL = `https: //openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
const getWeather = async(city) => {
  weather.innerHTML = `<h2> Loading... <h2>`
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  const response = await fetch(url);
  const data = await response.json()
  return showWeather(data)
}

 



form.addEventListener(
"submit",
function(event){
  getWeather(search.value)
  event.preventDefault();
}

  )