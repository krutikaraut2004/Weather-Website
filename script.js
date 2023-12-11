// Selecting DOM elements
const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

// Elements for displaying error if location is not found
const location_not_found = document.querySelector('.location-not-found');

// Element for displaying weather information
const weather_body = document.querySelector('.weather-body');

// Function to check weather using OpenWeatherMap API
async function checkWeather(city){
    // OpenWeatherMap API key
    const api_key = "b4487353fe01c0da1b860a11922a43e2";
    
    // API URL to get weather information for the specified city
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    // Fetching weather data from the API
    const weather_data = await fetch(`${url}`).then(response => response.json());

    // Handling case when location is not found (404 error)
    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    // Displaying weather information when location is found
    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    
    // Updating DOM with weather information
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    // Updating weather image based on weather conditions
    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "/assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "/assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "/assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "/assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "/assets/snow.png";
            break;
		case 'Drizzle':
            weather_img.src = "/assets/drizzle.png";
            break;
    }

    // Logging weather data to console
    console.log(weather_data);
}

// Adding click event listener to the search button
searchBtn.addEventListener('click', ()=>{
    // Calling the checkWeather function with the value from the input box
    checkWeather(inputBox.value);
});
