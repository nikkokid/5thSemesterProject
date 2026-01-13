import {useEffect, useState} from "react";
import {fetchCurrentWeather } from "../Services/Weather/WeatherServices";
import type { WeatherObservation } from "../Services/Weather/WeatherServices";
import { resolveWeatherIcon } from "../Services/Weather/IconMapper";
import type { WeatherIcon } from "../Services/Weather/IconMapper";

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

    const iconName: WeatherIcon = resolveWeatherIcon(weather.weatherCode, weather.cloudCover);

    const iconUrl = `/weatherIcons/${iconName}.svg`;
    return (
        <div className="text-white text-sm flex items-center space-x-2">
            <div>
                <span>{weather.temperature}°C</span>
            </div>
            <img src={iconUrl} alt={iconName} className="w-10 h-10"/>
        </div>
    );
}