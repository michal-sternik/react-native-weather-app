import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useCityContext } from "../../../../context";
import { PredictedPlace } from "../../../../types/cityTypes";

const PredictedCity = ({ city, country }: PredictedPlace) => {
  const { addCityToCitiesList } = useCityContext();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => addCityToCitiesList(city!)}
    >
      <View style={styles.content}>
        <Ionicons
          name="location-outline"
          size={20}
          color="#DDDDDD"
          style={styles.icon}
        />
        <Text style={styles.cityText}>{city}</Text>
        <Text style={styles.countryText}>{country}</Text>
        <Ionicons name="add-circle-outline" size={24} color="#DDDDDD" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2C2C2C",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 8,
  },
  cityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#DDDDDD",
  },
  countryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#DDDDDD",
    opacity: 0.7,
  },
});

export default PredictedCity;
