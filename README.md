# Weather Forecast App

This is a simple yet interactive weather forecast web application that allows users to search for the weather of any city, view the current temperature, and toggle between Fahrenheit and Celsius. The app also shows additional weather details such as humidity, wind speed, sunrise, sunset, and a 5-day forecast.

## Features

- Search for weather by city
- Toggle temperature between Fahrenheit and Celsius
- Displays current weather data (temperature, feels like, humidity, wind speed, etc.)
- 5-day weather forecast with conditions and temperatures
- Sunrise and sunset times
- Beautiful and responsive UI
- Background color changes based on weather conditions

## Technologies Used

- **HTML5**: Structure and content of the website
- **CSS3**: Styling and layout (with custom button and hover effects)
- **JavaScript**: Fetching data from the Visual Crossing Weather API and manipulating the DOM
- **Visual Crossing Weather API**: For fetching weather data

## Setup and Installation

### 1. Clone this repository

```bash
git clone https://github.com/your-username/weather-app.git
```

### 2. Navigate into the project folder

```bash
cd weather-app
```

### 3. Get your API key

- Visit Visual Crossing Weather to sign up and get your API key.
- Replace the API key in the script.js file with your own key.

```bash
const API_KEY = "YOUR_VISUAL_CROSSING_API_KEY"; // Replace with your actual API key
```

### 4. Open the project in your browser

- Simply open the index.html file in your browser to run the app.

## Features to Improve

- Add a "loading" animation while fetching data.
- Store previously searched cities in local storage.
- Implement dark mode.
- Display weather-related images using a GIF API like Giphy.

## Contributing

- Feel free to fork the project and make improvements! If you have any suggestions or improvements, please open an issue or pull request.

### Enjoy using the weather forecast app, and feel free to contribute!