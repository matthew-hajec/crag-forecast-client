export type GeocodeSuccessResult = {
  latitude: number;
  longitude: number;
  city: string;
  region: string;
  country: string;
  matchConfidence: number; // Value between 0 and 1
};

export type GeocodeErrorResult = {
  error: string;
};

export type GeocodeResult = GeocodeSuccessResult | GeocodeErrorResult;

export interface Geocoder {
  geocode(query: string): Promise<GeocodeResult>;
}

export interface ReverseGeocoder {
  reverseGeocode(latitude: number, longitude: number): Promise<GeocodeResult>;
}