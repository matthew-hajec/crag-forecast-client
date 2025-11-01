type Entry = {
  value: unknown;
  timestamp: number;
  expirationMs: number;
}

/**
 * Checks the cache for a valid cached value with the given key.
 * @param key The cache key.
 * @returns The cached value, or undefined if not found or expired.
 * @template T The expected type of the cached value.
 */
export function cachedValue<T>(key: string): T | undefined {
  const item = localStorage.getItem(key);
  if (!item) return undefined;

  const entry = JSON.parse(item) as Entry;
  const isExpired = Date.now() - entry.timestamp > entry.expirationMs;
  if (isExpired) {
    localStorage.removeItem(key);
    return undefined;
  }
  return entry.value as T;
}

/**
 * Clears the cached value for the given key.
 * @param key The cache key.
 * @returns void
 */
export function clearCachedValue(key: string): void {
  localStorage.removeItem(key);
}

/**
 * Sets a value in the cache with the given key and expiration time.
 * @param key The cache key.
 * @param value The value to cache.
 * @param expirationMs The expiration time in milliseconds.
 * @template T The type of the value to cache.
 */
export function setCachedValue<T>(key: string, value: T, expirationMs: number): void {
  const entry = {
    value,
    timestamp: Date.now(),
    expirationMs,
  }
  localStorage.setItem(key, JSON.stringify(entry));
}

