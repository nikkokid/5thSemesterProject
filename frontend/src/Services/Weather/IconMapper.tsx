export type WeatherIcon =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'fog'
  | 'rain'
  | 'snow'
  | 'thunder'
  | 'extreme';

export function resolveWeatherIcon(
  weatherCode: number | null,
  cloudCover: number | null
): WeatherIcon {

  // Hændelser vinder altid over cloud cover
  if (weatherCode !== null) {

    // Torden / ekstremt
    if (
      weatherCode === 189 ||
      weatherCode === 199 ||
      (weatherCode >= 190 && weatherCode <= 196)
    ) return 'thunder';

    // Sne / is
    if (
      weatherCode === 122 ||
      weatherCode === 124 ||
      (weatherCode >= 145 && weatherCode <= 148) ||
      (weatherCode >= 167 && weatherCode <= 178) ||
      (weatherCode >= 185 && weatherCode <= 187)
    ) return 'snow';

    // Regn / byger
    if (
      weatherCode === 121 ||
      (weatherCode >= 140 && weatherCode <= 166) ||
      (weatherCode >= 180 && weatherCode <= 184)
    ) return 'rain';

    // Tåge
    if (
      weatherCode === 120 ||
      (weatherCode >= 130 && weatherCode <= 135)
    ) return 'fog';
  }

  // Ingen signifikant vejr → brug cloud cover
  if (cloudCover !== null) {
    if (cloudCover <= 10) return 'clear';
    if (cloudCover <= 50) return 'partly-cloudy';
    if (cloudCover <= 90) return 'cloudy';
    if (cloudCover >= 100) return 'cloudy';
    if (cloudCover === 112) return 'fog';
  }

  // Fallback
  return 'partly-cloudy';
}
