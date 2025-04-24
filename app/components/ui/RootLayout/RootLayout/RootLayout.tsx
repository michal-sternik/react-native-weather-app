import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import CitiesMap from "../../CitiesMap/CitiesMap";
import CitiesPanel from "../../CitiesPanel/CitiesPanel";
import Ionicons from "react-native-vector-icons/Ionicons";

function RootLayout() {
  const [isMapVisible, setIsMapVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.mainArea}>
        <CitiesPanel isMapVisible={isMapVisible} />
        <CitiesMap isMapVisible={isMapVisible} />
      </View>

      {Platform.OS !== "web" && (
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setIsMapVisible(!isMapVisible)}
        >
          <Ionicons
            name={isMapVisible ? "list-outline" : "globe-outline"}
            size={32}
            color="white"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
  },
  mainArea: {
    flex: 1,
    flexDirection: "row",
  },
  toggleButton: {
    position: "absolute",
    bottom: 10,
    right: 32,
    backgroundColor: "#1976d2",
    padding: 10,
    borderRadius: 50,
  },
});

export default RootLayout;
