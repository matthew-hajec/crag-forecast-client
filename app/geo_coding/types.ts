type GeocodeSuccessResult = {
  latitude: number;
  longitude: number;
  city: string;
  region: string;
  country: string;
  matchConfidence: number; // Value between 0 and 1
};

type GeocodeErrorResult = {
  error: string;
};

type GeocodeResult = GeocodeSuccessResult | GeocodeErrorResult;

interface Geocoder {
  geocode(query: string): Promise<GeocodeResult>;
}