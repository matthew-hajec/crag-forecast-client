import type {
    SuccessForecastResponse,
    ErrorForecastResponse,
    ForecastResponse
} from './types';

export async function getForecastsByLocation(latitude: number, longitude: number, radius: number): Promise<ForecastResponse> {
    const response = await fetch(`/forecast/${latitude}/${longitude}/${radius}`);
    if (!response.ok) {
        try {
            const errorData: ErrorForecastResponse = await response.json();
            return errorData;
        } catch {
            return { error: 'An unknown error occurred' };
        }
    }
    const data: SuccessForecastResponse = await response.json();
    return data;
}