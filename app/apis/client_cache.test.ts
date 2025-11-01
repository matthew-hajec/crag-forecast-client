import { describe, test, expect } from "vitest";
import { cachedValue, setCachedValue } from "./client_cache";

describe("client_cache", () => {
  test("can set and get cached values", () => {
    const key = "test_key";
    const value = { data: "test_data" };

    setCachedValue(key, value, 1000); // 1 second expiration
    const cached = cachedValue<typeof value>(key);
    expect(cached).toEqual(value);
  });

  test("expired cache returns undefined", async () => {
    const key = "expired_key";
    const value = { data: "expired_data" };
    setCachedValue(key, value, 10); // 10 ms expiration

    // Initial retrieval should work
    const initialCached = cachedValue<typeof value>(key);
    expect(initialCached).toEqual(value);

    // Wait for 20 ms to ensure the cache expires
    await new Promise((r) => setTimeout(r, 20));
    const cached = cachedValue<typeof value>(key);
    expect(cached).toBeUndefined();
  });

  test("non-existent key returns undefined", () => {
    const key = "non_existent_key";
    const cached = cachedValue<typeof undefined>(key);
    expect(cached).toBeUndefined();
  });
});