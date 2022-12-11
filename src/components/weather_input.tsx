import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { error, inputLocation, weatherInfo } from "../utils/states";
import { getWeatherForecast } from "../utils/api";
import { ApiResponseType } from "../utils/api_response";

function WeatherInput() {
    const [iserror, setError] = useRecoilState(error);
    const [location, setLocation] = useRecoilState(inputLocation);
    const [weatherResult, setWeatherResult] = useRecoilState(weatherInfo);
    const [warning, setWarning] = useState(false);

    async function isFetched() {
        await getWeatherForecast<ApiResponseType>(location)
            .then(data => setWeatherResult(data))
            .catch(err => setError(err))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (Boolean(Number(location)) !== true) {
            if (typeof location === "string") {
                if (location.trim()) {
                    isFetched();
                    setLocation("");
                }
            }
        }
        else {
            setWarning(true);
            setLocation("");
        }
    }

    setTimeout(() => {
        setError("");
        setWarning(false);
    }, 3000)

    useEffect(() => {
        isFetched();
    }, [])

    useEffect(() => {
    }, [iserror, warning])

    return (
        <div className="bg-great-blue-500 md:w-2/4 p-4 lg:p-10">
            <h1 className="text-center text-great-blue-50 md:text-4xl">SKYENETT WEATHER FORECAST</h1>
            <p className="text-center">See current and future weather forcast</p>
            <form
                className="flex justify-center mt-4"
                onSubmit={handleSubmit}>
                <input
                    className="bg-great-blue-50 w-full md:w-96 outline-none p-2 rounded-md"
                    onChange={handleChange}
                    placeholder="Enter Location"
                    type="text"
                    value={location} />
            </form>
            {warning && <p className="font-bold text-lg text-center text-red-500">Location can't be a number please input a valid location !!!</p>}
            <>
                {iserror ? <p className="font-bold text-lg text-center text-red-500">{iserror}</p> :
                    <div className="mt-4">
                        {weatherResult &&
                            <div>
                                <h2 className="text-center text-3xl">{weatherResult.location.name},{weatherResult.location.country}</h2>
                                <p className="text-center">{weatherResult.location.region}</p>
                                <div className="p-4 lg:p-10">
                                    <figure className="flex justify-center">
                                        <img src={weatherResult.current.condition.icon} alt="icon" className="h-40 w-40" />
                                        <figcaption className="font-bold">{weatherResult.current.condition.text}</figcaption>
                                    </figure>
                                    <p className="text-center">Updated {convertToDate(weatherResult.current.last_updated)}</p>
                                    <h2 className="text-center text-3xl">Weather Details</h2>
                                    <ul className="py-4">
                                        <li className="flex justify-between py-2"><strong>Cloudy</strong>{weatherResult.current.cloud}%</li>
                                        <li className="flex justify-between py-2"><strong>Humidity</strong>{weatherResult.current.humidity}%</li>
                                        <li className="flex justify-between py-2"><strong>Wind</strong>{weatherResult.current.wind_kph}km/h</li>
                                        <li className="flex justify-between py-2"><strong>Wind_mph</strong>{weatherResult.current.wind_mph}m/p</li>
                                        <li className="flex justify-between py-2"><strong>Wind_degree</strong>{weatherResult.current.wind_degree}</li>
                                        <li className="flex justify-between py-2"><strong>Wind_dir</strong>{weatherResult.current.wind_dir}</li>
                                        <li className="flex justify-between py-2"><strong>Temp_c</strong>{weatherResult.current.temp_c + "°C"}</li>
                                        <li className="flex justify-between py-2"><strong>Temp_f</strong>{weatherResult.current.temp_f + "°F"}</li>
                                        <li className="flex justify-between py-2"><strong>Feelslike_c</strong>{weatherResult.current.feelslike_c + "°C"}</li>
                                        <li className="flex justify-between py-2"><strong>Feelslike_f</strong>{weatherResult.current.feelslike_f + "°F"}</li>
                                    </ul>
                                </div>
                            </div>
                        }
                    </div>
                }
            </>
        </div>
    )
}

const convertToDate = (date: string): string => {
    return new Date(date).toTimeString()
}

export default WeatherInput;
