import type {
  SuccessForecastResponse,
  ErrorForecastResponse,
  ForecastResponse,
} from "./types";
import {
  cachedValue,
  setCachedValue,
} from "../client_cache";

const API_BASE_URL = "http://api.cragforecast.com";
const MAX_AGE_MS = 24 * 60 * 60 * 1000; // Cache for 24 hours
const CACHE_NONCE = "0"; // Change this to invalidate all cache

export async function getForecastsByLocation(
  latitude: number,
  longitude: number,
  radius: number,
  page: number,
  resultsPerPage: number,
): Promise<ForecastResponse> {
  const cacheKeyStr = cacheKey(
    latitude,
    longitude,
    radius,
    page,
    resultsPerPage,
  );
  const cached = cachedValue<ForecastResponse>(cacheKeyStr);
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
      const errorData: ErrorForecastResponse = await response.json();
      return errorData;
    } catch {
      return { error: "An unknown error occurred" };
    }
  }
  const data: SuccessForecastResponse = await response.json();

  setCachedValue<ForecastResponse>(
    cacheKeyStr,
    data,
    MAX_AGE_MS,
  );
  return data;
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

function cacheResponse(key: string, data: ForecastResponse) {
  const cacheEntry = {
    timestamp: Date.now(),
    data,
  };
  localStorage.setItem(key, JSON.stringify(cacheEntry));
}

function getCachedResponse(
  key: string,
  maxAgeMs: number,
): ForecastResponse | null {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const cacheEntry = JSON.parse(cached);
  const isExpired = Date.now() - cacheEntry.timestamp > maxAgeMs;
  return isExpired ? null : cacheEntry.data;
}
