import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { randomCapitals } from '../utils/country_utils';
import { world_capitals_by_continent } from '../world_capitals_by_continent';
import RootLayout from './components/ui/RootLayout/RootLayout/RootLayout';
import { CitiesContext, CityContext } from '../context';
import CityService from '../api/services/cityService';
import { CityListItemProps } from '../types/cityTypes';

const Stack = createStackNavigator();

export default function App() {
  const [citiesList, setCitiesList] = useState<CityListItemProps[]>([]);

  const getWeatherForRandomCities = async (randomCitiesTable: string[]) => {
    try {
      const response = await CityService.getCitiesWeather(randomCitiesTable);
      setCitiesList(response);
    } catch (error) {
      console.error("Błąd pobierania danych", error);
    }
  };

  const addCityToCitiesList = async (cityName: string) => {
    try {
      const newCity = await CityService.getCityWeather(cityName);
      if (citiesList.some(city => city.id === newCity.id)) {
        Toast.show({ type: 'error', text1: 'Błąd', text2: 'Miasto już dodane!' });
      } else {
        setCitiesList([newCity, ...citiesList]);
      }
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Błąd', text2: 'Nie udało się dodać miasta.' });
    }
  };

  const removeCityFromList = (id: number) => {
    setCitiesList(citiesList.filter(city => city.id !== id));
  };

  useEffect(() => {
    getWeatherForRandomCities(randomCapitals(world_capitals_by_continent));
  }, []);

  return (
    <CitiesContext.Provider value={citiesList}>
      <CityContext.Provider value={{ addCityToCitiesList, removeCityFromList }}>
        {/* <NavigationContainer> */}
        {/* <Stack.Navigator screenOptions={{ headerShown: false }}> */}
        {/* <Stack.Screen name="Home" component={RootLayout} /> */}
        <RootLayout />
        {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Hedllof Wdorld</Text>
        </View> */}
        {/* </Stack.Navigator> */}
        {/* </NavigationContainer> */}
        <Toast />
      </CityContext.Provider>
    </CitiesContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
