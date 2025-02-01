const apiKey = "7e4e440738c79549a5d7c901dca82099";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      const data = await response.json();

      document.querySelector(".city").textContent = data.name;
      document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C`;
      document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
      document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

      // Update weather icon based on API data
      const weatherCondition = data.weather[0].main;
      const iconMapping = {
        Clouds: "img/clouds.png",
        Clear: "img/clear.png",
        Rain: "img/rain.png",
        Drizzle: "img/drizzle.png",
        Mist: "img/mist.png",
      };
      weatherIcon.src = iconMapping[weatherCondition] || "img/default.png";

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("An error occurred while fetching the weather data. Please try again.");
  }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});

// Optional: Load default city weather on page load
checkWeather("New York");
