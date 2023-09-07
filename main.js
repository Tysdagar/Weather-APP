// Función para establecer la imagen del clima basada en el tiempo actual
function setImageWeather(weather) {
  // Obtiene el elemento de imagen por su ID
  const imageElement = document.getElementById("countryImageWeather");

  // Rutas de las imágenes para diferentes condiciones climáticas
  const weatherImagesPath = {
    Clouds: "./images/clouds.png",
    Clear: "./images/clear.png",
    Drizzle: "./images/drizzle.png",
    Rain: "./images/rain.png",
    Mist: "./images/mist.png",
    Snow: "./images/snow.png",
  };

  // Desestructura las rutas de imágenes
  const { Clouds, Clear, Drizzle, Rain, Mist, Snow } = weatherImagesPath;

  // Asigna la ruta de la imagen correspondiente según el clima
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
      console.log("error"); // En caso de que el clima no coincida con ninguna opción
      break;
  }
}

// Función asincrónica para buscar datos meteorológicos y devolverlos
async function searchWeatherAndReturnData() {
  // Obtiene el valor del input donde se ingresa el nombre del país
  const countryInput = document.getElementById("countryInput");

  // Clave de API para OpenWeatherMap (asegúrate de tener una clave válida)
  const apiKey = "f587ee6f74f1fae5ed909afe4392d042";

  // URL de la API de OpenWeatherMap para obtener datos meteorológicos
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryInput.value}&appid=${apiKey}&units=metric`;

  try {
    // Realiza una solicitud fetch a la API
    const result = await fetch(apiUrl);

    // Verifica si la solicitud fue exitosa
    if (!result.ok) return;

    // Parsea la respuesta JSON
    const data = await result.json();

    // Extrae los datos relevantes de la respuesta
    const { main, name, weather, wind } = data;

    // Devuelve los datos en un objeto
    return { main, name, weather, wind };
  } catch (error) {
    // Manejo de errores en caso de una solicitud fallida o error de red
    console.error(error);
  }
}

// Función para mostrar los datos meteorológicos en la interfaz de usuario
async function showData(e) {
  // Evita que el formulario se envíe y recargue la página
  e.preventDefault();

  try {
    // Obtiene los datos meteorológicos mediante la función de búsqueda
    const { name, main, weather, wind } = await searchWeatherAndReturnData();

    // Verifica si se obtuvieron datos válidos
    if (!name || !main || !weather || !wind) {
      // Lanza un error si no se encontraron datos válidos
      throw new Error("La ciudad buscada no existe, haga una mejor búsqueda");
    }

    // Extrae datos específicos de los resultados
    const { temp, humidity } = main;
    const { speed, deg } = wind;

    // Actualiza elementos HTML con los datos obtenidos
    document.getElementById("countryName").innerHTML = name;
    document.getElementById("countryTemp").innerHTML = temp;
    document.getElementById("countryHumidity").innerHTML = humidity;
    document.getElementById("countrySpeed").innerHTML = speed;
    document.getElementById("countryDeg").innerHTML = deg;

    // Obtiene el elemento de la tarjeta y la tarjeta del país
    const card = document.getElementById("card");
    const countryCard = document.getElementById("countryCard");

    // Aplica clases CSS para la expansión de la tarjeta y la opacidad del país
    card.classList.add("expanded");
    countryCard.style.opacity = 100;

    // Establece la imagen del clima
    setImageWeather(weather[0].main);
  } catch (error) {
    // Manejo de errores si no se encontraron datos o se produjo un error en la búsqueda
    document.getElementById(
      "error"
    ).innerHTML = `Error al buscar una ciudad inexistente, haga una mejor búsqueda`;
    const card = document.getElementById("card");

    // Aplica una clase CSS para mostrar un error en la tarjeta
    card.classList.add("error");
  }
}

// Función para manejar el cambio en el input
function handleChange() {
  const card = document.getElementById("card");
  const countryCard = document.getElementById("countryCard");

  // Elimina clases CSS y restablece la opacidad y contenido de error
  card.classList.remove("expanded", "error");
  countryCard.style.opacity = 0;
  document.getElementById("error").innerHTML = ``;
}
