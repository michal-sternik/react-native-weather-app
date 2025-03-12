import React, { useState } from 'react';
import { Platform, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useCitiesContext } from '../../../../context';
import MapView from './mymap'
import { Marker } from 'react-native-maps';
import WeatherMapIcon from '../WeatherMapIcon/WeatherMapIcon';
const CitiesMap = ({ isMapVisible }: { isMapVisible: boolean }) => {
  const citiesList = useCitiesContext();
  const [clicked, setClicked] = useState<boolean>(false);

  // 🔹 Warunkowy import
  // let MapView;
  // let Marker;

  const MapView = Platform.OS === 'web'
    ? require('./mymap.web').default
    : require('./mymap').default;

  if (Platform.OS === 'web') {
    // MapView = require('@teovilla/react-native-web-maps').default;
    // Marker = () => null; // 🔹 Web nie obsługuje natywnych znaczników
  } else {
    // MapView = require('react-native-maps').default;
    // Marker = require('react-native-maps').Marker;
  }

  return (
    //   isMapVisible && (
    //     <View style={styles.container}>
    //       {clicked && (
    //         <TouchableOpacity style={styles.backButton} onPress={() => setClicked(false)}>
    //           <Text style={styles.backButtonText}>Back</Text>
    //         </TouchableOpacity>
    //       )}


    //       <MapView
    //         style={styles.map}
    //         provider={Platform.OS === 'web' ? 'google' : undefined}
    //         googleMapsApiKey={Platform.OS === 'web' ? 'AIzaSyDv8AjomoB2fe0hUeEFXsJidxr1Lp_gqgw' : undefined}
    //         initialRegion={{
    //           latitude: 20,
    //           longitude: 0,
    //           latitudeDelta: 30,
    //           longitudeDelta: 30,
    //         }}
    //       >
    // {Platform.OS !== 'web' &&
    //   citiesList.map((city) => (
    //     <Marker
    //       key={city.id}
    //       coordinate={{ latitude: city.coord.latitude, longitude: city.coord.longitude }}
    //       onPress={() => setClicked(true)}
    //     />
    //   ))}
    //       </MapView>
    //     </View>
    //   )
    (Platform.OS === 'web' || isMapVisible) && <MapView
      style={styles.map}
      provider={Platform.OS === 'web' ? 'google' : undefined}
      googleMapsApiKey={Platform.OS === 'web' ? 'AIzaSyDv8AjomoB2fe0hUeEFXsJidxr1Lp_gqgw' : undefined}
      initialRegion={{
        latitude: 30,
        longitude: 0,
        latitudeDelta: 10,
        longitudeDelta: 90,
      }}

    >
      {/* TODO - dodac markery i volia*/}
      {Platform.OS !== 'web' &&
        citiesList && citiesList.map((city) => (
          <Marker
            key={city.id}
            coordinate={{ latitude: city.coord.latitude, longitude: city.coord.longitude }}
            onPress={() => setClicked(true)}
          // anchor={{ x: 0.5, y: 1 }}
          >
            <WeatherMapIcon name={city.name} temperature={city.temperature} icon={city.icon} />
          </Marker>
        ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CitiesMap;
