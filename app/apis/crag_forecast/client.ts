import type {
  Weather,
  Crag,
  Forecast,
  APISuccess,
  APIFailure,
  APIResponse
} from "./types";
import {
  cachedValue,
  setCachedValue,
} from "../client_cache";
import { wmoToDescription } from "./wmo";

const API_BASE_URL = "https://api.cragforecast.com";
const MAX_AGE_MS = 24 * 60 * 60 * 1000; // Cache for 24 hours
const CACHE_NONCE = "0"; // Change this to invalidate all cache

type ForecastsOrError = Forecast[] | APIFailure;

export async function getForecastsByLocation(
  latitude: number,
  longitude: number,
  radius: number,
  page: number,
  resultsPerPage: number,
): Promise<ForecastsOrError> {
  const cacheKeyStr = cacheKey(
    latitude,
    longitude,
    radius,
    page,
    resultsPerPage,
  );
  const cached = cachedValue<Forecast[]>(cacheKeyStr);
  if (cached) return cached;

  let response: Response;
  try {
    response = await fetch(
      `${API_BASE_URL}/forecast/${latitude}/${longitude}/${radius}/${(page - 1) * resultsPerPage}/${resultsPerPage}`,
    );
  } catch (error) {
    return {
      error:
        "Network error or request timed out\r\n" +
        (error instanceof Error ? `: ${error.message}` : ""),
    };
  }

  if (!response.ok) {
    try {
      const errorData: APIFailure = await response.json();
      return errorData;
    } catch {
      return { error: "An unknown error occurred" };
    }
  }
  const data: APISuccess = await response.json();

  const forecasts = apiResponseToForecasts(data);

  setCachedValue<Forecast[]>(
    cacheKeyStr,
    forecasts,
    MAX_AGE_MS,
  );
  return forecasts;
}

function apiResponseToForecasts(
  apiResponse: APISuccess,
): Forecast[] {
  const forecasts: Forecast[] = apiResponse.map((item) => ({
    crag: item.crag,
    weather_window: item.weather_window.map((weather) => ({
      ...weather, 
      condition: wmoToDescription(weather.wmo_code),
    })),
  }));

  return forecasts;
}
  

function cacheKey(
  latitude: number,
  longitude: number,
  radius: number,
  page: number,
  resultsPerPage: number,
): string {
  return `forecast_${latitude}_${longitude}_${radius}_${page}_${resultsPerPage}_v${CACHE_NONCE}`;
}