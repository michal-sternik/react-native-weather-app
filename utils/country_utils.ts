/* eslint-disable @typescript-eslint/no-explicit-any */
import { CityListItemProps, Coord, WorldCapitalsByContinent } from "../../types/cityTypes";

export function randomCapitals(world_capitals_by_continent: WorldCapitalsByContinent): string[] {
  const randomCapitalsList: string[] = [];

  for (const continentCapitals of Object.values(world_capitals_by_continent)) {
    const randomCapital = continentCapitals[Math.floor(Math.random() * continentCapitals.length)];
    randomCapitalsList.push(randomCapital);
  }

  return randomCapitalsList;
}



export function convertCityData(cityData: any, addedByUser: boolean): CityListItemProps {
  const coord: Coord = {
    latitude: cityData.coord.lat,
    longitude: cityData.coord.lon
  };

  return {
    id: cityData.id,
    name: cityData.name,
    coord: coord,
    temperature: cityData.main.temp,
    windSpeed: cityData.wind.speed,
    clouds: cityData.clouds.all,
    addedByUser: addedByUser,
    icon: cityData.weather[0].icon
  };
}