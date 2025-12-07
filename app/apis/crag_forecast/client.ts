import type {
  Weather,
  Crag,
  Forecast,
  APISuccess,
  APIFailure,
  APIResponse
} from "./types";
import { wmoToDescription } from "./wmo";

const API_BASE_URL = "http://localhost:4000";

type ForecastsOrError = Forecast[] | APIFailure;

export async function getForecastsByLocation(
  latitude: number,
  longitude: number,
  radius: number,
  page: number,
  resultsPerPage: number,
): Promise<ForecastsOrError> {
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

