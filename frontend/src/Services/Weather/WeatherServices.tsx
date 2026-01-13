const BaseURL = 'https://opendataapi.dmi.dk/v2/metObs/collections/observation/items';
const StationId = '06030'; //Station ID for Aalborg Lufthavn, Mest tilgængelig Data

export type WeatherObservation = {
    weatherCode: number;
    temperature: number;
    cloudCover: number;
}

export async function fetchCurrentWeather(): Promise<WeatherObservation> {
  const weatherUrl = `${BaseURL}?stationId=${StationId}&parameterId=weather&limit=1&sortorder=observed,DESC`;
  const tempUrl = `${BaseURL}?stationId=${StationId}&parameterId=temp_dry&limit=1&sortorder=observed,DESC`;
  const cloudUrl = `${BaseURL}?stationId=${StationId}&parameterId=cloud_cover&limit=1&sortorder=observed,DESC`;

  const [weatherResponse, tempResponse, cloudResponse] = await Promise.all([
    fetch(weatherUrl),
    fetch(tempUrl),
    fetch(cloudUrl)
  ]);

  if (!weatherResponse.ok || !tempResponse.ok || !cloudResponse.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const weatherData = await weatherResponse.json();
  const tempData = await tempResponse.json();
  const cloudData = await cloudResponse.json();

  const weatherCode = weatherData.features[0].properties.value;
  const temperature = tempData.features[0].properties.value;
  const cloudCover = cloudData.features[0].properties.value;

  return { weatherCode, temperature, cloudCover };
}