import type {
    SuccessForecastResponse,
    ErrorForecastResponse,
    ForecastResponse
} from './types';

const API_BASE_URL = 'http://localhost:4000';
const MAX_AGE_MS = 15 * 60 * 1000; // 15 minutes

export async function getForecastsByLocation(latitude: number, longitude: number, radius: number): Promise<ForecastResponse> {
    const cached = getCachedResponse(`forecast_${latitude}_${longitude}_${radius}`, MAX_AGE_MS);
    if (cached) return cached;

    const response = await fetch(`${API_BASE_URL}/forecast/${latitude}/${longitude}/${radius}`);

    if (!response.ok) {
        try {
            const errorData: ErrorForecastResponse = await response.json();
            return errorData;
        } catch {
            return { error: 'An unknown error occurred' };
        }
    }
    const data: SuccessForecastResponse = await response.json();
    cacheResponse(`forecast_${latitude}_${longitude}_${radius}`, data);
    return data;
}

function cacheResponse(key: string, data: ForecastResponse) {
    const cacheEntry = {
        timestamp: Date.now(),
        data
    };
    localStorage.setItem(key, JSON.stringify(cacheEntry));
}

function getCachedResponse(key: string, maxAgeMs: number): ForecastResponse | null {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const cacheEntry = JSON.parse(cached);
    const isExpired = Date.now() - cacheEntry.timestamp > maxAgeMs;
    return isExpired ? null : cacheEntry.data;
}