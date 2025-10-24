export type Weather = {
  date: string;
  condition: string;
  max_humidity_percent: number;
  max_precipitation_probability: number;
  max_temperature_c: number;
  min_temperature_c: number;
};

export type Crag = {
  id: number;
  name: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
};

// Expect 5 days of forecast data, 1 previous day, 1 current day, and 3 future days
export type Forecast = {
  crag: Crag;
  weather_window: Weather[];
};

// Success type for /forecast/lat/long/radius endpoint
export type SuccessForecastResponse = Forecast[];

// Error type for /forecast/lat/long/radius endpoint
export type ErrorForecastResponse = {
  error: string;
};

export type ForecastResponse = SuccessForecastResponse | ErrorForecastResponse;
