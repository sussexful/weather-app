import { useRecoilValue } from "recoil";
import { error, weatherInfo } from "../utils/states";

function WeatherInfo() {
    const weatherResult = useRecoilValue(weatherInfo);
    const isError = useRecoilValue(error);

    return (
        <div className="bg-great-blue-50 p-4 lg:p-10 md:w-2/4">
            <h2 className="text-center md:text-4xl">Future Weather Forecast</h2>
            {isError ? null :
                <div>
                    {weatherResult &&
                        <div>
                            {weatherResult.forecast.forecastday.map((forecastInfo) => (
                                <div className="pt-4 md:pt-10" key={forecastInfo.date}>
                                    <p className="font-bold">{new Date(forecastInfo.date).toLocaleDateString("en-En", { weekday: "long" })}</p>
                                    <div className="flex pt-4">
                                        <figure className="flex w-3/4">
                                            <img className="h-40 w-40" src={forecastInfo.day.condition.icon} alt="icon" />
                                            <figcaption>{forecastInfo.day.condition.text}</figcaption>
                                        </figure>
                                        <ul className="p-2 w-1/4">
                                            <li className="py-1"><strong>MaxTemp_c: </strong>{forecastInfo.day.maxtemp_c + "°C"}</li>
                                            <li className="py-1"><strong>MaxTemp_f: </strong>{forecastInfo.day.maxtemp_f + "°F"}</li>
                                            <li className="py-1"><strong>MinTemp_c: </strong>{forecastInfo.day.mintemp_c + "°C"}</li>
                                            <li className="py-1"><strong>MinTemp_f: </strong>{forecastInfo.day.mintemp_f + "°F"}</li>
                                            <li className="py-1"><strong>AvgTemp_c: </strong>{forecastInfo.day.avgtemp_c + "°C"}</li>
                                            <li className="py-1"><strong>AvgTemp_f: </strong>{forecastInfo.day.avgtemp_f + "°F"}</li>
                                            <li className="py-1"><strong>MaxWind_mph: </strong>{forecastInfo.day.maxwind_mph}m/h</li>
                                            <li className="py-1"><strong>Minwind_kph: </strong>{forecastInfo.day.maxwind_kph}km/h</li>
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default WeatherInfo;
