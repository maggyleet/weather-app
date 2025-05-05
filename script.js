const API_KEY = "MRCKCA9CSCPD9DJNCDTKQBWR5";
let useCelsius = false;

document.getElementById("locationForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const location = document.getElementById("locationInput").value;
    if (!location) return;

    document.getElementById("loading").style.display = "block";
    const data = await getWeatherData(location);
    document.getElementById("loading").style.display = "none";

    if (data) {
        const processed = processWeatherData(data);
        displayWeather(processed);
        updateBackground(processed.condition);
    } else {
        document.getElementById("weatherDisplay").innerText = "Weather not found.";
    }
});

document.getElementById("tempToggle").addEventListener("change", async () => {
    useCelsius = document.getElementById("tempToggle").checked;
    const location = document.getElementById("locationInput").value;
    if (location) {
        document.getElementById("loading").style.display = "block";
        const data = await getWeatherData(location);
        document.getElementById("loading").style.display = "none";
        if (data) {
            const processed = processWeatherData(data);
            displayWeather(processed);
            updateBackground(processed.condition);
        }
    }
});

async function getWeatherData(location) {
    try {
        const unitGroup = useCelsius ? "metric" : "us";
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
            location
        )}?unitGroup=${unitGroup}&key=${API_KEY}&include=current,days`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok.");
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Fetch error:", err);
        return null;
    }
}

function processWeatherData(data) {
    const current = data.currentConditions;

    return {
        location: data.resolvedAddress,
        temperature: current.temp,
        feelsLike: current.feelslike,
        condition: current.conditions,
        icon: current.icon,
        humidity: current.humidity,
        windSpeed: current.windspeed,
        sunrise: current.sunrise,
        sunset: current.sunset,
        forecast: data.days.slice(1, 6).map(day => ({
            date: day.datetime,
            temp: day.temp,
            condition: day.conditions,
            icon: day.icon
        }))
    };
}

function displayWeather(data) {
    const unit = useCelsius ? "°C" : "°F";

    const todayHTML = `
    <h2>${data.location}</h2>
    <p><strong>Temperature:</strong> ${data.temperature} ${unit}</p>
    <p><strong>Feels Like:</strong> ${data.feelsLike} ${unit}</p>
    <p><strong>Condition:</strong> ${data.condition}</p>
    <p><strong>Humidity:</strong> ${data.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.windSpeed} km/h</p>
    <p><strong>Sunrise:</strong> ${data.sunrise}</p>
    <p><strong>Sunset:</strong> ${data.sunset}</p>
    <img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/${data.icon}.png" alt="${data.condition}" width="100"/>
  `;

    const forecastHTML = `
    <h3>5-Day Forecast</h3>
    <div class="forecast-grid">
      ${data.forecast
            .map(day => {
                return `
            <div class="forecast-card">
              <p>${day.date}</p>
              <img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/${day.icon}.png" width="60"/>
              <p>${day.temp} ${unit}</p>
              <p>${day.condition}</p>
            </div>
          `;
            })
            .join("")}
    </div>
  `;

    document.getElementById("weatherDisplay").innerHTML = todayHTML + forecastHTML;
}

function updateBackground(condition) {
    const body = document.body;
    if (/rain|storm/i.test(condition)) {
        body.style.backgroundColor = "#4a6fa5";
    } else if (/cloud/i.test(condition)) {
        body.style.backgroundColor = "#cccccc";
    } else if (/sun|clear/i.test(condition)) {
        body.style.backgroundColor = "#ffe082";
    } else {
        body.style.backgroundColor = "#bdbdbd";
    }
}
