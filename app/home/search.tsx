import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getForecastsByLocation } from "~/crag_forecast/client";
import { Result } from "~/components/result";
import type { SuccessForecastResponse } from "~/crag_forecast/types";


export default function SearchPage() {
    const [forecasts, setForecasts] = useState<SuccessForecastResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const latitude = searchParams.get("latitude");
        const longitude = searchParams.get("longitude");
        const radius = searchParams.get("radius");

        if(!latitude || !longitude || !radius) {
            setError("Missing search parameters.");
            setIsLoading(false);
            return;
        }

        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        const rad = parseInt(radius, 10);

        if (isNaN(lat) || isNaN(lng) || isNaN(rad)) {
            setError("Invalid search parameters.");
            setIsLoading(false);
            return;
        }

        handleSearch({ latitude: lat, longitude: lng, radius: rad });
    }, [searchParams]);

    const handleSearch = async (params: { latitude: number; longitude: number; radius: number }) => {
        setForecasts(null);
        setError(null);
        setIsLoading(true);

        const data = await getForecastsByLocation(params.latitude, params.longitude, params.radius);
        
        if (Array.isArray(data)) {
            setForecasts(data);
        } else {
            setError(data.error);
        }
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {forecasts && forecasts.map((forecast) => (
                <Result key={forecast.crag.id} forecast={forecast} />
            ))}
        </>
    );
}