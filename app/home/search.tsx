import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { getForecastsByLocation } from "~/crag_forecast/client";
import { Result } from "~/components/result";
import type { SuccessForecastResponse } from "~/crag_forecast/types";

export default function SearchPage() {
  const [forecasts, setForecasts] = useState<SuccessForecastResponse | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");
    const radius = searchParams.get("radius");

    if (!latitude || !longitude || !radius) {
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

  const handleSearch = async (params: {
    latitude: number;
    longitude: number;
    radius: number;
  }) => {
    setForecasts(null);
    setError(null);
    setIsLoading(true);

    const data = await getForecastsByLocation(
      params.latitude,
      params.longitude,
      params.radius,
    );

    if (Array.isArray(data)) {
      setForecasts(data);
    } else {
      setError(data.error);
    }
    setIsLoading(false);
  };

  const placeholders = useMemo(() => Array.from({ length: 6 }), []);

  return (
    <main className="min-h-screen bg-slate-50/60 py-12 dark:bg-gray-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="flex flex-col gap-3 text-gray-900 dark:text-slate-100">
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-slate-400">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 transition hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-500"
            >
              <span aria-hidden>←</span>
              New search
            </Link>
            <span className="hidden md:inline">Results</span>
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Climbing forecasts
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-600 dark:text-slate-400">
              We analyse humidity, temperature, and rain probability for each crag in your radius.
            </p>
          </div>
        </header>

        {isLoading ? (
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {placeholders.map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="h-6 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="mt-3 h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="mt-6 space-y-3">
                  {Array.from({ length: 3 }).map((__, innerIndex) => (
                    <div
                      key={`skeleton-row-${index}-${innerIndex}`}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-800" />
                      <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800" />
                      <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-800" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ) : null}

        {!isLoading && error ? (
          <section className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800 shadow-sm dark:border-red-800/60 dark:bg-red-950/30 dark:text-red-200">
            <h2 className="text-lg font-semibold">Something went wrong</h2>
            <p className="mt-2">{error}</p>
            <p className="mt-4 text-xs text-red-600/80 dark:text-red-300/80">
              Double-check the latitude, longitude, and radius parameters or try a different search.
            </p>
          </section>
        ) : null}

        {!isLoading && !error && forecasts && forecasts.length === 0 ? (
          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900 shadow-sm dark:border-amber-700/70 dark:bg-amber-900/20 dark:text-amber-100">
            <h2 className="text-lg font-semibold">No crags in range</h2>
            <p className="mt-2">Try increasing your radius or exploring another location.</p>
          </section>
        ) : null}

        {!isLoading && !error && forecasts ? (
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {forecasts.map((forecast) => (
              <Result key={forecast.crag.id} forecast={forecast} />
            ))}
          </section>
        ) : null}
      </div>
    </main>
  );
}
