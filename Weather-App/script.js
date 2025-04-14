const apiKey = 'db3a065bddcbc11a28c2bd39021c7f07'; // Replace with your OpenWeatherMap API key

document.addEventListener('DOMContentLoaded', () => {
  const locationElement = document.getElementById('location');
  const temperatureElement = document.getElementById('temperature');
  const descriptionElement = document.getElementById('description');

  // Check if geolocation is available
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      // Fetch weather data
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          const tempCelsius = (data.main.temp - 273.15).toFixed(1);
          const tempFahrenheit = ((tempCelsius * 9/5) + 32).toFixed(1);
          const weatherDescription = data.weather[0].description;
          const city = data.name;

          locationElement.textContent = `Location: ${city}`;
          temperatureElement.textContent = `Temperature: ${tempCelsius}°C / ${tempFahrenheit}°F`;
          descriptionElement.textContent = `Condition: ${weatherDescription}`;
        })
        .catch(() => {
          locationElement.textContent = 'Unable to retrieve weather data';
        });
    }, () => {
      locationElement.textContent = 'Geolocation permission denied';
    });
  } else {
    locationElement.textContent = 'Geolocation is not supported by this browser';
  }
});
