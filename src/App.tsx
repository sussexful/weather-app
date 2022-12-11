import WeatherInfo from "./components/weather_info";
import WeatherInput from "./components/weather_input";

function App() {
  return (
    <div className="font-chakra h-full md:flex">
      <WeatherInput />
      <WeatherInfo />
    </div>
  )
}

export default App;
