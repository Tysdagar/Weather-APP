// Custom JavaScript
// This script is used to fetch weather data and display it on a webpage.

// Function to set the weather image based on weather conditions.
function setImageWeather(weather) {
  const imageElement = document.getElementById("countryImageWeather");

  const weatherImagesPath = {
    Clouds: "./images/clouds.png",
    Clear: "./images/clear.png",
    Drizzle: "./images/drizzle.png",
    Rain: "./images/rain.png",
    Mist: "./images/mist.png",
    Snow: "./images/snow.png",
  };

  const { Clouds, Clear, Drizzle, Rain, Mist, Snow } = weatherImagesPath;

  switch (weather) {
    case "Clouds":
      imageElement.src = Clouds;
      break;
    case "Clear":
      imageElement.src = Clear;
      break;
    case "Drizzle":
      imageElement.src = Drizzle;
      break;
    case "Rain":
      imageElement.src = Rain;
      break;
    case "Mist":
      imageElement.src = Mist;
      break;
    case "Snow":
      imageElement.src = Snow;
      break;
    default:
      console.log("error");
      break;
  }
}

// Function to fetch weather data from an API and display it.
async function searchWeatherAndReturnData() {
  const countryInput = document.getElementById("countryInput");

  const apiKey = "f587ee6f74f1fae5ed909afe4392d042";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryInput.value}&appid=${apiKey}&units=metric`;

  try {
    const result = await fetch(apiUrl);

    if (!result.ok) return;

    const data = await result.json();
    const { main, name, weather, wind } = data;
    return { main, name, weather, wind };
  } catch (error) {}
}

// Function to display weather data on the webpage.
async function showData(e) {
  e.preventDefault();

  try {
    const { name, main, weather, wind } = await searchWeatherAndReturnData();

    if (!name || !main || !weather || !wind) {
      throw new Error("La ciudad buscada no existe, haga una mejor búsqueda");
    }

    const { temp, humidity } = main;
    const { speed, deg } = wind;

    document.getElementById("countryName").innerHTML = name;
    document.getElementById("countryTemp").innerHTML = temp;
    document.getElementById("countryHumidity").innerHTML = humidity;
    document.getElementById("countrySpeed").innerHTML = speed;
    document.getElementById("countryDeg").innerHTML = deg;

    const card = document.getElementById("card");
    const countryCard = document.getElementById("countryCard");
    card.classList.add("expanded");
    countryCard.style.opacity = 100;

    setImageWeather(weather[0].main);
  } catch (error) {
    document.getElementById(
      "error"
    ).innerHTML = `Error al buscar una ciudad inexistente, haga una mejor búsqueda`;
    const card = document.getElementById("card");
    card.classList.add("error");
  }
}

// Function to handle input change and reset UI.
function handleChange() {
  const card = document.getElementById("card");
  card.classList.remove("expanded");
  card.classList.remove("error");
  const countryCard = document.getElementById("countryCard");
  document.getElementById("error").innerHTML = ``;
  countryCard.style.opacity = 0;
}
