const statusDiv = document.getElementById("status");
const weatherDiv = document.getElementById("weather");
const dateTimeEl = document.getElementById("dateTime");

const API_KEY = "e5416837c331607a8c81093cb3ccb944";

// 🕒 DATE & TIME (WORKS IMMEDIATELY)
function updateDateTime() {
  const now = new Date();
  dateTimeEl.textContent = now.toLocaleString("en-IN");
}
updateDateTime();
setInterval(updateDateTime, 1000);

// 📍 GET CITY
const city = localStorage.getItem("city");

if (!city) {
  statusDiv.textContent = "❌ No city found. Go back and search again.";
} else {
  getWeather(city);
}

// 🌦 WEATHER
async function getWeather(city) {
  statusDiv.textContent = "⏳ Loading weather...";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    statusDiv.textContent = "";

    weatherDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <h3>${data.main.temp} °C</h3>
      <p>${data.weather[0].description}</p>
    `;

  } catch (error) {
    statusDiv.textContent = "❌ Weather not found";
  }
}

const UNSPLASH_KEY = "wIvv9cNtSqxdcjvYWWcqWKkh1G27VsqvbN5O4oeif3A";

async function setCityBackground(city) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${city}&per_page=1&client_id=${UNSPLASH_KEY}`
    );

    const data = await res.json();

    if (data.results && data.results.length > 0) {
      document.body.style.backgroundImage =
        `url(${data.results[0].urls.regular})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    }
  } catch (err) {
    console.log("Background image failed");
  }
}

// call AFTER weather loads
setCityBackground(city);


const searchAgainBtn = document.getElementById("searchAgainBtn");

searchAgainBtn.addEventListener("click", () => {
  localStorage.removeItem("city"); // optional
  window.location.href = "index.html";
});

