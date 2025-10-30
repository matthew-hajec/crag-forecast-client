import type { GeocodeResult, Geocoder } from "./types";

export class GeoapifyGeocoder implements Geocoder {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async geocode(query: string): Promise<GeocodeResult> {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        query,
      )}&api_key=${this.apiKey}`,
    );

    if (!response.ok) {
      return Promise.resolve({
        error: `Geocoding request failed with status ${response.status}`,
      });
    }

    const data = await response.json();

    console.log(data);

    const results = data.features;

    const mappedResults = results.map((result: any) => {
      console.log(result);
      return {
        latitude: result.properties.lat,
        longitude: result.properties.lon,
        city: result.properties.city,
        region: result.properties.state,
        country: result.properties.country,
        matchConfidence: result.properties.rank.confidence,
      };
    });

    return Promise.resolve(mappedResults);
  }
}
