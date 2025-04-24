import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import PredictedCity from "../PredictedCity/PredictedCity";
import CityAutocompleteService from "../../../../api/services/cityAutocompleteService";
import { PredictedPlace } from "../../../../types/cityTypes";

const AddCity = () => {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [candidatesList, setCandidatesList] = useState<PredictedPlace[]>([]);

  useEffect(() => {
    if (inputValue) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        CityAutocompleteService.getListOfPredictetCities(inputValue)
          .then((response) => {
            const filteredResponse = response.filter(
              (item) => item.city !== undefined
            );
            setCandidatesList(filteredResponse);
          })
          .finally(() => setIsTyping(false));
      }, 400);
      return () => clearTimeout(timer);
    }
    setCandidatesList([]);
  }, [inputValue]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="rgba(221, 221, 221, 0.4)"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Search for cities to compare..."
          placeholderTextColor="rgba(221, 221, 221, 0.6)"
        />
        {inputValue.length > 0 && (
          <TouchableOpacity onPress={() => setInputValue("")}>
            <Ionicons name="close" size={20} color="#DDDDDD" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.resultContainer}>
        {isTyping ? (
          <ActivityIndicator size="large" color="white" />
        ) : candidatesList.length !== 0 ? (
          candidatesList.map((predictedCity) => (
            <PredictedCity key={predictedCity.city} {...predictedCity} />
          ))
        ) : (
          <Text style={styles.noResultText}>No cities found...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
    minHeight: 80,
    padding: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2C",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  input: {
    flex: 1,
    color: "#DDDDDD",
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
  resultContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  noResultText: {
    fontSize: 16,
    color: "white",
  },
});

export default AddCity;
