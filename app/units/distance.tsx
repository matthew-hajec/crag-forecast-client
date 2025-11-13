export function formatDistance(
  distanceInKm: number, 
  useMetric: boolean, 
  includeUnit: boolean = true
): string {
  if (useMetric) {
    const dist = distanceInKm.toFixed(1);
    return includeUnit ? `${dist} km` : dist;
  } else {
    const dist = (distanceInKm * 0.621371).toFixed(1);
    return includeUnit ? `${dist} mi` : dist;
  }
}
