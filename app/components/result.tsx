import type { Forecast } from "~/crag_forecast/types";

export function Result({ forecast }: { forecast: Forecast }) {
  const { crag, weather_window } = forecast;

  // Helper to get temperature range color
  const getTempColor = (temp: number) => {
    if (temp < 5) return "text-blue-600 dark:text-blue-400";
    if (temp < 15) return "text-cyan-600 dark:text-cyan-400";
    if (temp < 25) return "text-green-600 dark:text-green-400";
    return "text-orange-600 dark:text-orange-400";
  };

  // Helper to format condition
  const formatCondition = (condition: string) => {
    return condition.charAt(0).toUpperCase() + condition.slice(1);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-200">
      {/* Crag Header */}
      <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          {crag.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {crag.region}, {crag.country}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          📍 {crag.latitude.toFixed(3)}°, {crag.longitude.toFixed(3)}°
        </p>
      </div>

      {/* Weather Forecast */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          5-Day Forecast
        </h4>
        
        {weather_window.map((day, index) => {
          const date = new Date(day.date); // EST timezone
          const today = new Date();
            // Compare days
            const isToday = today.toDateString() === date.toDateString();
          
          return (
            <div 
              key={day.date} 
              className={`flex items-center justify-between p-3 rounded-md ${
                isToday 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' 
                  : 'bg-gray-50 dark:bg-gray-800'
              }`}
            >
              {/* Date */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>

              {/* Condition */}
              <div className="flex-1 text-center px-2">
                <p className="text-xs text-gray-600 dark:text-gray-300 capitalize">
                  {formatCondition(day.condition)}
                </p>
              </div>

              {/* Temperature */}
              <div className="flex-1 text-right px-2">
                <p className="text-sm font-semibold">
                  <span className={getTempColor(day.max_temperature_c)}>
                    {day.max_temperature_c.toFixed(0)}°
                  </span>
                  <span className="text-gray-400 dark:text-gray-500 mx-1">/</span>
                  <span className={getTempColor(day.min_temperature_c)}>
                    {day.min_temperature_c.toFixed(0)}°
                  </span>
                </p>
              </div>

              {/* Humidity & Precipitation */}
              <div className="flex-1 text-right">
                <div className="flex flex-col text-xs">
                  <span className="text-gray-600 dark:text-gray-400">
                    💧 {day.max_humidity_percent}%
                  </span>
                  <span className={`${
                    day.max_precipitation_probability > 50 
                      ? 'text-blue-600 dark:text-blue-400 font-medium' 
                      : 'text-gray-500 dark:text-gray-500'
                  }`}>
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