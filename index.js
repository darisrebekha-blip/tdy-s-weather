const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city === "") {
    alert("Please enter a city");
    return;
  }

  localStorage.setItem("city", city);
  window.location.href = "result.html";
});

