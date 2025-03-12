export interface CityListItemProps {
    id: number;
    name: string;
    coord: Coord;
    temperature: number;
    windSpeed: number;
    clouds: number;
    addedByUser: boolean,
    icon: string,
}

export interface Coord {
    latitude: number;
    longitude: number;

}
export interface WorldCapitalsByContinent {
    europe: string[];
    africa: string[];
    asia: string[];
    north_america: string[];
    south_america: string[];
    australia: string[];
}

export interface PredictedPlace {
    city: string | undefined;
    country: string;
}