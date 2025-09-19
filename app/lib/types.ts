export interface Location {
  lat: number;
  lon: number;
}

export interface AutocompleteProperties {
  country: string;
  country_code: string;
  county: string;
  city: string;
  region: string;
  municipality: string;
  state: string;
  iso3166_2: string;
  datasource: Datasource;
  lon: number;
  lat: number;
  population?: number;
  result_type: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
  category: string;
  timezone: Timezone;
  plus_code: string;
  plus_code_short?: string;
  rank: Rank;
  place_id: string;
  hamlet?: string;
  postcode?: string;
  district?: string;
}
export interface AutocompleteResponse {
  features: [
    {
      properties: AutocompleteProperties;
    }
  ];
}
export interface Timezone {
  name: string;
  name_alt: string;
  offset_STD: string;
  offset_STD_seconds: number;
  offset_DST: string;
  offset_DST_seconds: number;
  abbreviation_STD: string;
  abbreviation_DST: string;
}
export interface Rank {
  confidence: number;
  confidence_city_level: number;
  match_type: string;
}
export interface Datasource {
  sourcename: string;
  attribution: string;
  license: string;
  url: string;
}

export interface HourlyItem {
  timestamp: string;
  temperature: number;
  weatherCode: number;
  uvIndex: number;
  windSpeed: number;
  visibility: number;
  precipitationProbability: number;
  rainIntensity: number;
  snowIntensity: number;
  freezingRainIntensity: number;
}
export interface CurrentLocation {
  country: string;
  country_code: string;
  region?: string;
  state?: string;
  place_id: string;
  city: string;
  lon: number;
  lat: number;
  timezone: { name: string };
}
export interface DailyItem {
  timestamp: string;
  temperatureMax: number;
  temperatureMin: number;
  sunriseTime: string;
  sunsetTime: string;
  weatherCodeMax: number;
  moonriseTime: string;
  moonsetTime: string;
}
