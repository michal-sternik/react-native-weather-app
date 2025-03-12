import { createContext, useContext } from 'react';
import { CityListItemProps } from './types/cityTypes';

export const CitiesContext = createContext<CityListItemProps[] | undefined>(undefined);

export function useCitiesContext() {
    const citiesList = useContext(CitiesContext);

    return citiesList;
}


export const CityContext = createContext<{
    addCityToCitiesList: (cityName: string) => Promise<void>;
    removeCityFromList: (id: number) => void;
}>({
    addCityToCitiesList: async () => { },
    removeCityFromList: () => { }
});

export const useCityContext = () => useContext(CityContext);