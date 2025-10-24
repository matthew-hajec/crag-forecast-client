import { useState } from "react";

interface SearchParams {
  latitude: number;
  longitude: number;
  radius: number;
}

interface SearchProps {
  onSearch?: (params: SearchParams) => void;
  minRadius?: number;
  maxRadius?: number;
}

export function Search({ 
  onSearch, 
  minRadius = 50, 
  maxRadius = 1000 
}: SearchProps) {
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [radius, setRadius] = useState<number>(100);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isGettingLocation, setIsGettingLocation] = useState<boolean>(false);

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate latitude
    const lat = parseFloat(latitude);
    if (!latitude.trim()) {
      newErrors.latitude = "Latitude is required";
    } else if (isNaN(lat) || lat < -90 || lat > 90) {
      newErrors.latitude = "Latitude must be between -90 and 90";
    }

    // Validate longitude
    const lng = parseFloat(longitude);
    if (!longitude.trim()) {
      newErrors.longitude = "Longitude is required";
    } else if (isNaN(lng) || lng < -180 || lng > 180) {
      newErrors.longitude = "Longitude must be between -180 and 180";
    }

    // Validate radius
    if (radius < minRadius || radius > maxRadius) {
      newErrors.radius = `Radius must be between ${minRadius} and ${maxRadius} km`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = () => {
    if (validateInputs()) {
      onSearch?.({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        radius
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setErrors({ location: "Geolocation is not supported by this browser" });
      return;
    }

    setIsGettingLocation(true);
    setErrors({});

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setLatitude(lat.toFixed(6));
        setLongitude(lng.toFixed(6));
        setIsGettingLocation(false);
      },
      (error) => {
        let errorMessage = "Unable to get your location";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        
        setErrors({ location: errorMessage });
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Search Climbing Areas
      </h2>
      
      <div className="space-y-4">
        {/* Use My Location Button */}
        <div>
          <button
            onClick={handleGetLocation}
            disabled={isGettingLocation}
            className="w-full inline-flex items-center justify-center px-3 py-2 border border-indigo-300 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 disabled:bg-indigo-25 dark:disabled:bg-indigo-900/20 disabled:cursor-not-allowed text-indigo-700 dark:text-indigo-300 font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-offset-gray-900"
          >
            {isGettingLocation ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Getting Location...
              </>
            ) : (
              <>
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Use My Location
              </>
            )}
          </button>
        </div>

        {/* Location Error */}
        {errors.location && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.location}
            </p>
          </div>
        )}

        {/* Latitude Input */}
        <div>
          <label 
            htmlFor="latitude" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Latitude
          </label>
          <input
            id="latitude"
            type="number"
            step="any"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g. 37.7749"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 ${
              errors.latitude 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.latitude && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.latitude}
            </p>
          )}
        </div>

        {/* Longitude Input */}
        <div>
          <label 
            htmlFor="longitude" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Longitude
          </label>
          <input
            id="longitude"
            type="number"
            step="any"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g. -122.4194"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 ${
              errors.longitude 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.longitude && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.longitude}
            </p>
          )}
        </div>

        {/* Radius Slider */}
        <div>
          <label 
            htmlFor="radius" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Search Radius: {radius} km
          </label>
          <div className="flex items-center space-x-3">
            <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[2rem]">
              {minRadius}km
            </span>
            <input
              id="radius"
              type="range"
              min={minRadius}
              max={maxRadius}
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[3rem] text-right">
              {maxRadius}km
            </span>
          </div>
          {errors.radius && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.radius}
            </p>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={!latitude.trim() || !longitude.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          Search Climbing Areas
        </button>

        {/* Quick location hint */}
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          <p>💡 Tip: You can use your browser's location or check coordinates on a map</p>
        </div>
      </div>
    </div>
  );
}