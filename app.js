// animation
var text = "The Only Weather Forecast You Need";
var index = 0;
var speed = 100;
var typedTextElement = document.getElementById("typed-text");

function type() {
  if (index < text.length) {
    typedTextElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(type, speed);
  } else {
    document.getElementById("blinking-cursor").style.visibility = "visible";
  }
}

type();

// Fetch
const locationInput = document.getElementById("locationInput");
const weatherText = document.getElementById("weather_text");
const weatherText2 = document.getElementById("weather_text2");
const errorText = document.getElementById("error_text");
document.getElementById("searchIcon").addEventListener("click", function () {
  const location = locationInput.value.trim();
  if (location) {
    getWeatherData(location);
  }
});

let weatherCounter1 = 0;
let weatherCounter2 = 0;

function getWeatherData(location) {
  const apiKey = "aa5054434d8f22ce278e558e63f49dbc";
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      weatherText.textContent = `Weather in ${location}, ${data.city.country}`;
      weatherText2.textContent = ` ${location}, ${data.city.country}`;
      errorText.textContent = "";

      document.getElementById("weatherForecast1").innerHTML = "";
      document.getElementById("weatherForecast2").innerHTML = "";
      weatherCounter1 = 0;
      weatherCounter2 = 0;

      let currentDate = "";
      for (const weather of data.list) {
        const date = new Date(weather.dt * 1000).toLocaleDateString("en-US", {
          weekday: "long",
        });
        const temperature = weather.main.temp;
        const description = weather.weather[0].description;
        const icon = weather.weather[0].icon;

        if (date !== currentDate) {
          currentDate = date;

          const weatherDiv = document.createElement("div");
          weatherDiv.className = "col-md-4";
          weatherDiv.innerHTML = `
            <div class="card" style="color: #4b515d; border-radius: 35px">
    <div class="card-body p-4">
      <div class="d-flex flex-column text-center mb-4">
        <h6 class="font-weight-bold mb-0">${date}</h6>
        <span class=" mb-0 mt-3" style="color: #1c2331; font-size: 1.7rem; display: inline-block">${temperature}°C</span>
        <span class="" style="color: #1c2331; font-size: 1.2rem">${description}</span>
      </div>
      <div class="d-flex align-items-center">
        <div class="flex-grow-1">
          <div>
            <i class="fas fa-wind fa-fw" style="color: #868b94"></i>
            <span class="ms-1">${weather.wind.speed} m/s</span>
          </div>
          <div>
            <i class="fas fa-tint fa-fw" style="color: #868b94"></i>
            <span class="ms-1">${weather.main.humidity}%</span>
          </div>
        </div>
        <div>
          <img src="https://openweathermap.org/img/w/${icon}.png">
        </div>
      </div>
    </div>
  </div>
          `;

          if (weatherCounter1 < 3) {
            document.getElementById("weatherForecast1").appendChild(weatherDiv);
            weatherCounter1++;
          } else if (weatherCounter2 < 3) {
            document.getElementById("weatherForecast2").appendChild(weatherDiv);
            weatherCounter2++;
          }
        }
      }
    })
    .catch((error) => {
      errorText.textContent = "Error fetching weather data. Please try again.";
      console.error("Error fetching weather data:", error);
    });
}

locationInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const location = locationInput.value.trim();
    if (location) {
      getWeatherData(location);
    }
  }
});

function resetWeatherForecast() {
  document.getElementById("weatherForecast1").innerHTML = "";
  document.getElementById("weatherForecast2").innerHTML = "";
  weatherCounter1 = 0;
  weatherCounter2 = 0;
}

document.getElementById("resetBtn").addEventListener("click", function () {
  locationInput.value = "";
  resetWeatherForecast();
});
