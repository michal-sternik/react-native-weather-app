// Zamieniona wersja CityListItem.tsx na React Native
import React, { useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from 'react-native-vector-icons/Feather';
import { useCityContext } from "../../../../context";
import { CityListItemProps } from "../../../../types/cityTypes";

function CityListItem({ id, name, temperature, windSpeed, clouds, addedByUser, icon }: CityListItemProps) {
  const [clicked, setClicked] = useState(false);
  const { removeCityFromList } = useCityContext();

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeOut = (cb: () => void) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => cb());
  };

  const fontSize = { fontSize: Platform.OS == 'web' ? 14 : 10 }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View
        style={[
          styles.content,
          { backgroundColor: addedByUser ? "#608d8d" : "#8c9b98" },
        ]}
      >
        <View style={styles.row}>
          <Image
            source={{ uri: `http://openweathermap.org/img/wn/${icon}@2x.png` }}
            style={styles.weatherIcon}
          />
          <Text style={styles.cityTitle}>{name}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.chip}>
              <Ionicons name="thermometer-outline" size={16} color="white" />
              <Text style={[styles.chipText, fontSize]}>{Math.floor(temperature - 273)}°C</Text>
            </View>
            <View style={styles.chip}>
              <Feather name="wind" size={16} color="white" />
              <Text style={[styles.chipText, fontSize]}>{windSpeed} m/s</Text>
            </View>
            <View style={styles.chip}>
              <Ionicons name="cloud-outline" size={16} color="white" />
              <Text style={[styles.chipText, fontSize]}>{clouds} %</Text>
            </View>
          </View>

        </View>
        <TouchableOpacity onPress={() => fadeOut(() => removeCityFromList(id))}>
          <Ionicons name="close" size={24} color="#DDDDDD" />
        </TouchableOpacity>
      </View>
    </Animated.View >
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 12,
  },
  content: {
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  weatherIcon: {
    width: 40,
    height: 40,
  },
  cityTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#DDDDDD",
  },
  infoContainer: {
    flexDirection: "row",
    gap: 5,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1976d2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  chipText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default CityListItem;
