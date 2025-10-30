import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { getForecastsByLocation } from "~/crag_forecast/client";
import { Result } from "~/components/result";
import type { SuccessForecastResponse } from "~/crag_forecast/types";
import ResultWireframe from "~/components/result_wireframe";

type SearchParams = {
  latitude: number;
  longitude: number;
  radius: number;
};

export default function SearchPage() {
  const maxPage = 3;

  const [page, setPage] = useState(1);
  const [forecasts, setForecasts] = useState<SuccessForecastResponse | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const [isCelsius, setIsCelsius] = useState<boolean>(false);

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

    initialSearch({ latitude: lat, longitude: lng, radius: rad });
  }, [searchParams]);

  const initialSearch = async (params: SearchParams) => {
    setForecasts(null);
    setError(null);
    setIsLoading(true);

    const data = await getForecastsByLocation(
      params.latitude,
      params.longitude,
      params.radius,
      page,
      6, // Load 6 results per "page"
    );

    if (Array.isArray(data)) {
      setForecasts(data);
    } else {
      setError(data.error);
    }
    setIsLoading(false);
  };

  const loadMore = async(params: SearchParams) => {
    if (!forecasts) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;

    const data = await getForecastsByLocation(
      params.latitude,
      params.longitude,
      params.radius,
      nextPage,
      6,
    );

    if (Array.isArray(data)) {
      setForecasts((prev) => (prev ? [...prev, ...data] : data));
      setPage(nextPage);
    } else {
      setError(data.error);
    }
    setIsLoadingMore(false);
  };

  const canLoadMore = forecasts && forecasts.length > 0 && page < maxPage;

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
              <ResultWireframe key={`placeholder-${index}`} />
            ))}
          </section>
        ) : null}

        {/* We've encountered an error */}
        {!isLoading && error ? (
          <section className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800 shadow-sm dark:border-red-800/60 dark:bg-red-950/30 dark:text-red-200">
            <h2 className="text-lg font-semibold">Something went wrong</h2>
            <p className="mt-2">{error}</p>
            <p className="mt-4 text-xs text-red-600/80 dark:text-red-300/80">
              Double-check the latitude, longitude, and radius parameters or try a different search.
            </p>
          </section>
        ) : null}

        {/* We've loaded zero results */}
        {!isLoading && !error && forecasts && forecasts.length === 0 ? (
          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900 shadow-sm dark:border-amber-700/70 dark:bg-amber-900/20 dark:text-amber-100">
            <h2 className="text-lg font-semibold">No crags in range</h2>
            <p className="mt-2">Try increasing your radius or exploring another location.</p>
          </section>
        ) : null}

        {/* We've loaded results */}
        {!isLoading && !error && forecasts ? (
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {forecasts.map((forecast) => (
              <Result key={forecast.crag.id} forecast={forecast} isCelsius={isCelsius} />
            ))}
          </section>
        ) : null}

        <div className="flex w-full items-center justify-center">
          {canLoadMore && (
            <button
              onClick={() => loadMore({
                latitude: parseFloat(searchParams.get("latitude") || "0"),
                longitude: parseFloat(searchParams.get("longitude") || "0"),
                radius: parseInt(searchParams.get("radius") || "0", 10),
              })}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-600 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-slate-100 dark:hover:border-blue-500"
            >
              {isLoadingMore ? "Loading..." : "Load more"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
