document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([51.505, -0.09], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.on('click', function(e) {
        const { lat, lng } = e.latlng;
        getWeatherByCoordinates(lat, lng);
    });

    document.getElementById('weatherForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const city = document.getElementById('city').value;
        const country = document.getElementById('country').value;
        const area = document.getElementById('area').value;
        getWeatherByLocation(city, country, area);
    });

    function getWeatherByCoordinates(lat, lng) {
        const apiKey = '2b03bcf720da67efce03d2b957e8a417'; // Your API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;

        console.log("Fetching weather data for coordinates:", apiUrl);

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    document.getElementById('weatherInfo').innerHTML = `<p>Error: ${data.message}</p>`;
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                document.getElementById('weatherInfo').innerHTML = '<p>Error fetching weather data. Please try again.</p>';
            });
    }

    function getWeatherByLocation(city, country, area) {
        const apiKey = '2b03bcf720da67efce03d2b957e8a417'; // Your API key
        let location = `${city},${country}`;
        if (area) {
            location = `${area},${location}`;
        }
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        console.log("Fetching weather data for location:", apiUrl);

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    document.getElementById('weatherInfo').innerHTML = `<p>Error: ${data.message}</p>`;
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                document.getElementById('weatherInfo').innerHTML = '<p>Error fetching weather data. Please try again.</p>';
            });
    }

    function displayWeather(data) {
        const weatherInfo = `
            <p><strong>City:</strong> ${data.name}</p>
            <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity} %</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;
        document.getElementById('weatherInfo').innerHTML = weatherInfo;
    }
});
