import React, { useState } from "react";
import {
  Platform,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useCitiesContext } from "../../../../context";
import MapView from "./mymap";
import { Marker } from "react-native-maps";
import WeatherMapIcon from "../WeatherMapIcon/WeatherMapIcon";
const CitiesMap = ({ isMapVisible }: { isMapVisible: boolean }) => {
  const citiesList = useCitiesContext();
  const [clicked, setClicked] = useState<boolean>(false);

  const MapView =
    Platform.OS === "web"
      ? require("./mymap.web").default
      : require("./mymap").default;

  return (
    (Platform.OS === "web" || isMapVisible) && (
      <MapView
        style={styles.map}
        provider={Platform.OS === "web" ? "google" : undefined}
        googleMapsApiKey={
          Platform.OS === "web"
            ? "AIzaSyDv8AjomoB2fe0hUeEFXsJidxr1Lp_gqgw"
            : undefined
        }
        initialRegion={{
          latitude: 30,
          longitude: 0,
          latitudeDelta: 10,
          longitudeDelta: 90,
        }}
      >
        {Platform.OS !== "web" &&
          citiesList &&
          citiesList.map((city) => (
            <Marker
              key={city.id}
              coordinate={{
                latitude: city.coord.latitude,
                longitude: city.coord.longitude,
              }}
              onPress={() => setClicked(true)}
            >
              <WeatherMapIcon temperature={city.temperature} />
            </Marker>
          ))}
      </MapView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default CitiesMap;
