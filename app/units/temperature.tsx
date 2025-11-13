export function formatTemperature(
  tempC: number,
  isCelsius: boolean,
  includeUnit: boolean = true,
): string {
  if(isCelsius) {
    const temp = `${tempC.toFixed(0)}°`;
    return includeUnit ? temp + "C" : temp;
  } else {
    const temp = `${((tempC * 9) / 5 + 32).toFixed(0)}°`;
    return includeUnit ? temp + "F" : temp;
  }
}
