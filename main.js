// This script is used to fetch weather data and display it on a webpage.

// Function to set the weather image based on weather conditions.
function setImageWeather(weather) {
  const imageElement = document.getElementById("countryImageWeather");

  // Define paths to weather images for different weather conditions.
  const weatherImagesPath = {
    Clouds: "./images/clouds.png",
    Clear: "./images/clear.png",
    Drizzle: "./images/drizzle.png",
    Rain: "./images/rain.png",
    Mist: "./images/mist.png",
    Snow: "./images/snow.png",
  };

  const { Clouds, Clear, Drizzle, Rain, Mist, Snow } = weatherImagesPath;

  // Set the source of the weather image based on the provided weather condition.
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

// Function to fetch weather data from an API and return it as an object.
async function searchWeatherAndReturnData(apiKey) {
  const countryInput = document.getElementById("countryInput");

  // Construct the API URL for fetching weather data using the provided API key.
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryInput.value}&appid=${apiKey}&units=metric`;

  try {
    const result = await fetch(apiUrl);

    if (!result.ok) return;

    // Parse the JSON response and extract relevant weather data.
    const data = await result.json();
    const { main, name, weather, wind } = data;
    return { main, name, weather, wind };
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Function to display weather data on the webpage.
async function showData(e) {
  e.preventDefault();
  // Retrieve the API key from an environment variable.
  const apiKey = import.meta.env.VITE_API_KEY;

  try {
    const { name, main, weather, wind } = await searchWeatherAndReturnData(
      apiKey
    );

    if (!name || !main || !weather || !wind) {
      throw new Error(
        "The searched city does not exist; please refine your search."
      );
    }

    // Extract specific weather data and update the corresponding elements on the webpage.
    const { temp, humidity } = main;
    const { speed, deg } = wind;

    document.getElementById("countryName").innerHTML = name;
    document.getElementById("countryTemp").innerHTML = temp;
    document.getElementById("countryHumidity").innerHTML = humidity;
    document.getElementById("countrySpeed").innerHTML = speed;
    document.getElementById("countryDeg").innerHTML = deg;

    // Expand the card and display the weather image.
    const card = document.getElementById("card");
    const countryCard = document.getElementById("countryCard");
    card.classList.add("expanded");
    countryCard.style.opacity = 100;

    setImageWeather(weather[0].main);
  } catch (error) {
    // Display an error message when the city is not found.
    document.getElementById(
      "error"
    ).innerHTML = `Error: City not found. Please refine your search.`;
    const card = document.getElementById("card");
    card.classList.add("error");
  }
}

// Function to handle input change and reset the UI.
function handleChange() {
  const card = document.getElementById("card");
  card.classList.remove("expanded");
  card.classList.remove("error");
  const countryCard = document.getElementById("countryCard");
  document.getElementById("error").innerHTML = ``;
  countryCard.style.opacity = 0;
}

const form = document.getElementById("form");

const countryInput = document.getElementById("countryInput");

form.addEventListener("submit", showData);

countryInput.addEventListener("input", handleChange);
