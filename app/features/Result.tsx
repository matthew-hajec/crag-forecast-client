import type { Forecast } from "~/apis/crag_forecast/types";
import { haversine } from "~/haversine";
import { createGoogleMapsLink } from "~/google_maps";
import { formatDistance } from "../units/distance";
import { formatTemperature } from "../units/temperature";

type Props = {
  forecast: Forecast;
  isCelsius: boolean;
  isMetric: boolean;
  orginLatitude: number;
  orginLongitude: number;
};

export default function Result({ forecast, isCelsius, isMetric, orginLatitude, orginLongitude }: Props) {
  const { crag, weather_window } = forecast;

  const getTempColor = (temp: number) => {
    if (temp < 5) return "text-blue-600 dark:text-blue-400";
    if (temp < 15) return "text-cyan-600 dark:text-cyan-400";
    if (temp < 25) return "text-green-600 dark:text-green-400";
    return "text-orange-600 dark:text-orange-400";
  };

  const distance = haversine(crag.latitude, crag.longitude, orginLatitude, orginLongitude);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-200">
      {/* Crag Header */}
      <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <a href={createGoogleMapsLink(crag.latitude, crag.longitude)} target="_blank" rel="noopener noreferrer">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            {crag.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {crag.region}, {crag.country}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            📍 {crag.latitude.toFixed(3)}°, {crag.longitude.toFixed(3)}° ({formatDistance(distance, isMetric, true)} away)
          </p>
        </a>
      </div>

      {/* Weather Forecast */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          5-Day Forecast
        </h4>

        {/* Header row */}
        <div className="flex justify-between text-xs px-3 text-gray-500">
          <p className="w-[45px]">
            Date
          </p>
          <p className="w-[100px] text-center">
            Condition
          </p>
          <p className="w-[75px] text-center">
            Temp
          </p>
          <p className="w-[55px] text-end">
            Moisture
          </p>
        </div>

        {weather_window.map((day) => {
          // Date logic is centered on the crag's perspective, so "Today" could be different than the user's local date.
          // 1. Determine if this forecast day is "today" relative to the crag's timezone.
          const now = new Date();
          const iana_timezone = day.timezone;
          const formatter = new Intl.DateTimeFormat("en-CA", {
            timeZone: iana_timezone,
          });
          const isToday = formatter.format(now) === day.date;

          // 2. Create a reliable Date object for display purposes.
          // Appending 'T00:00:00' ensures the date string is parsed in the user's
          // local timezone, preventing off-by-one-day errors from UTC conversion.
          const displayDate = new Date(`${day.date}T00:00:00`);

          return (
            <div
              key={day.date}
              className={`flex items-center justify-between p-3 rounded-md ${isToday
                ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                : "bg-gray-50 dark:bg-gray-800"
                }`}
            >
              {/* Date */}
              <div>
                <p className="w-[45px] text-sm font-medium text-gray-900 dark:text-white">
                  {isToday
                    ? "Today"
                    : displayDate.toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {displayDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Condition */}
              <div className="w-[100px] text-center">
                <p className="text-xs text-gray-600 dark:text-gray-300 capitalize">
                  {day.condition}
                </p>
              </div>

              {/* Temperature */}
              <div className="w-[75px] text-center">
                <p className="text-sm font-semibold">
                  <span className={getTempColor(day.max_temperature_c)}>
                    {formatTemperature(day.max_temperature_c, isCelsius, false)}
                  </span>
                  <span className="text-gray-400 dark:text-gray-500 mx-1">
                    /
                  </span>
                  <span className={getTempColor(day.min_temperature_c)}>
                    {formatTemperature(day.min_temperature_c, isCelsius, false)}
                  </span>
                </p>
              </div>

              {/* Humidity & Precipitation */}
              <div className="w-[55px] text-right">
                <div className="flex flex-col text-xs">
                  <span className="text-gray-600 dark:text-gray-400">
                    💧 {day.max_humidity_percent}%
                  </span>
                  <span
                    className={`${day.max_precipitation_probability > 50
                      ? "text-blue-600 dark:text-blue-400 font-medium"
                      : "text-gray-500 dark:text-gray-500"
                      }`}
                  >
                    🌧 {day.max_precipitation_probability}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
