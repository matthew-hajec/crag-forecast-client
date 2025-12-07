export function wmoToDescription(wmoCode: number): string {
    switch (true) {
        // --- Clear & Cloudy ---
        case wmoCode === 0: return "Clear";
        case wmoCode === 1: return "Clear"; // Mainly Clear -> Clear
        case wmoCode === 2: return "Cloudy"; // Partly Cloudy -> Cloudy
        case wmoCode === 3: return "Overcast";

        // --- Atmospheric Obscurations ---
        case wmoCode === 4: return "Smoke";
        case wmoCode === 5: return "Haze";
        case (wmoCode >= 6 && wmoCode <= 9): return "Dust";
        case wmoCode === 10: return "Mist";
        case (wmoCode >= 11 && wmoCode <= 12): return "Fog";
        case (wmoCode >= 30 && wmoCode <= 35): return "Sandstorm";
        case (wmoCode >= 36 && wmoCode <= 39): return "Blowing Snow";

        // --- Nearby / Recent Weather ---
        case wmoCode === 13: return "Lightning";
        case (wmoCode >= 14 && wmoCode <= 16): return "Precip";
        case wmoCode === 17: return "Thunderstorm";
        case wmoCode === 18: return "Squalls";
        case wmoCode === 19: return "Funnel Cloud";
        case (wmoCode >= 20 && wmoCode <= 29): return "Precip";

        // --- Fog ---
        case wmoCode === 40: return "Fog";
        case [41, 42, 44, 46].includes(wmoCode): return "Fog";
        case [43, 45, 47].includes(wmoCode): return "Fog";
        case (wmoCode >= 48 && wmoCode <= 49): return "Rime Fog";

        // --- Drizzle ---
        case (wmoCode >= 50 && wmoCode <= 59): return "Drizzle";

        // --- Rain ---
        case (wmoCode >= 60 && wmoCode <= 69): return "Rain";

        // --- Snow & Solid Precipitation ---
        case (wmoCode >= 70 && wmoCode <= 79): return "Snow";

        // --- Showers & Hail ---
        case (wmoCode >= 80 && wmoCode <= 82): return "Showers";
        case (wmoCode >= 83 && wmoCode <= 84): return "Rain/Snow";
        case (wmoCode >= 85 && wmoCode <= 86): return "Snow Showers";
        case (wmoCode >= 87 && wmoCode <= 90): return "Hail";

        // --- Thunderstorms ---
        case (wmoCode >= 91 && wmoCode <= 99): return "Thunderstorm";

        // --- Catch-all ---
        default: return "Unknown";
    }
}