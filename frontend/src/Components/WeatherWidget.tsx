import {useEffect, useState} from "react";
import {fetchCurrentWeather } from "../Services/Weather/WeatherServices";
import type { WeatherObservation } from "../Services/Weather/WeatherServices";

export default function WeatherWidget() {
    const [weather, setWeather] = useState<WeatherObservation | null>(null);

    useEffect(() => {
        async function fetchWeather() {
            const weather = await fetchCurrentWeather();
            setWeather(weather);
        }

        fetchWeather();
    }, []);
    if (!weather) {
        return <div>Loading...</div>;
    }
    return (
        <div className="text-white text-sm flex items-center space-x-2">
            <div>
                <span>Temp: {weather.temperature}°C</span>
            </div>
            <div>   
                <span>Weather Code: {weather.weatherCode}</span>
            </div>
            <div>
                <span>Cloud Cover: {weather.cloudCover}</span>
            </div>
        </div>
    );
}