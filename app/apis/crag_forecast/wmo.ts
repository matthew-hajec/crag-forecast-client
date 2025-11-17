export function wmoToDescription(wmoCode: number): string {
    switch (true) {
        // --- Clear & Cloudy ---
        case wmoCode === 0: return "Clear";
        case wmoCode === 1: return "Mainly Clear";
        case wmoCode === 2: return "Partly Cloudy";
        case wmoCode === 3: return "Overcast";

        // --- Atmospheric Obscurations ---
        case wmoCode === 4: return "Smoke";
        case wmoCode === 5: return "Haze";
        case (wmoCode >= 6 && wmoCode <= 9): return "Dust / Sand";
        case wmoCode === 10: return "Mist";
        case (wmoCode >= 11 && wmoCode <= 12): return "Fog Patches";
        case (wmoCode >= 30 && wmoCode <= 35): return "Duststorm / Sandstorm";
        case (wmoCode >= 36 && wmoCode <= 39): return "Blowing Snow";
        
        // --- Nearby / Recent Weather ---
        case wmoCode === 13: return "Lightning Nearby";
        case (wmoCode >= 14 && wmoCode <= 16): return "Precipitation Nearby";
        case wmoCode === 17: return "Thunderstorm Nearby";
        case wmoCode === 18: return "Squalls";
        case wmoCode === 19: return "Funnel Cloud";
        case (wmoCode >= 20 && wmoCode <= 29): return "Recent Precipitation";

        // --- Fog ---
        case wmoCode === 40: return "Fog Nearby";
        case [41, 42, 44, 46].includes(wmoCode): return "Fog Patches";
        case [43, 45, 47].includes(wmoCode): return "Fog";
        case (wmoCode >= 48 && wmoCode <= 49): return "Rime Fog";

        // --- Drizzle ---
        case (wmoCode >= 50 && wmoCode <= 51): return "Light Drizzle";
        case (wmoCode >= 52 && wmoCode <= 53): return "Moderate Drizzle";
        case (wmoCode >= 54 && wmoCode <= 55): return "Heavy Drizzle";
        case wmoCode === 56: return "Light Freezing Drizzle";
        case wmoCode === 57: return "Heavy Freezing Drizzle";
        case (wmoCode >= 58 && wmoCode <= 59): return "Rain & Drizzle";

        // --- Rain ---
        case (wmoCode >= 60 && wmoCode <= 61): return "Light Rain";
        case (wmoCode >= 62 && wmoCode <= 63): return "Moderate Rain";
        case (wmoCode >= 64 && wmoCode <= 65): return "Heavy Rain";
        case wmoCode === 66: return "Light Freezing Rain";
        case wmoCode === 67: return "Heavy Freezing Rain";
        case (wmoCode >= 68 && wmoCode <= 69): return "Rain & Snow";

        // --- Snow & Solid Precipitation ---
        case (wmoCode >= 70 && wmoCode <= 71): return "Light Snow";
        case (wmoCode >= 72 && wmoCode <= 73): return "Moderate Snow";
        case (wmoCode >= 74 && wmoCode <= 75): return "Heavy Snow";
        case wmoCode === 76: return "Diamond Dust";
        case wmoCode === 77: return "Snow Grains";
        case wmoCode === 78: return "Ice Crystals";
        case wmoCode === 79: return "Ice Pellets";
        
        // --- Showers & Hail ---
        case wmoCode === 80: return "Light Rain Showers";
        case wmoCode === 81: return "Moderate Rain Showers";
        case wmoCode === 82: return "Violent Rain Showers";
        case (wmoCode >= 83 && wmoCode <= 84): return "Rain & Snow Showers";
        case wmoCode === 85: return "Light Snow Showers";
        case wmoCode === 86: return "Heavy Snow Showers";
        case (wmoCode >= 87 && wmoCode <= 88): return "Snow Pellets / Small Hail";
        case wmoCode === 89: return "Light Hail";
        case wmoCode === 90: return "Heavy Hail";
        
        // --- Thunderstorms ---
        case (wmoCode >= 91 && wmoCode <= 94): return "Recent Thunderstorm";
        case [95, 97, 98].includes(wmoCode): return "Thunderstorm";
        case [96, 99].includes(wmoCode): return "Thunderstorm with Hail";

        // --- Catch-all ---
        default: return "Unknown";
    }
  }