export default function ResultWireframe() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="h-6 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
      <div className="mt-3 h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-800" />
      <div className="mt-6 space-y-3">
        {Array.from({ length: 3 }).map((__, innerIndex) => (
          <div
            key={`skeleton-row-${innerIndex}`}
            className="flex items-center justify-between gap-4"
          >
            <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
