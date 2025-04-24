import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import CityListItem from "../CityListItem/CityListItem";
import { useCitiesContext } from "../../../../context";
import AddCity from "../AddCity/AddCity";
import { CityListItemProps } from "../../../../types/cityTypes";
import { MAX_ITEMS_PER_PAGE } from "../../../../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RadioButton } from "react-native-paper";

interface SortType {
  type: "temperature" | "windSpeed" | "clouds";
  ascending: boolean;
}

function CitiesPanel({ isMapVisible }: { isMapVisible: boolean }) {
  const citiesList = useCitiesContext();
  const [sortBy, setSortBy] = useState<SortType | null>(null);
  const [filterOption, setFilterOption] = useState("pagination");
  const [page, setPage] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number>(1);

  const renderPaginatedCities = () => {
    if (!citiesList) return [];
    const sortedList = sortedCitiesList();
    const sliceFrom = page * MAX_ITEMS_PER_PAGE - MAX_ITEMS_PER_PAGE;
    const sliceTo = page * MAX_ITEMS_PER_PAGE;
    return sortedList.slice(sliceFrom, sliceTo);
  };

  useEffect(() => {
    if (citiesList) {
      setPagesCount(Math.ceil(citiesList.length / MAX_ITEMS_PER_PAGE));
    }
  }, [citiesList]);

  const sortedCitiesList = () => {
    if (!citiesList) return [];
    return [...citiesList].sort((a, b) => {
      if (!sortBy) return 0;
      return sortBy.ascending
        ? a[sortBy.type] - b[sortBy.type]
        : b[sortBy.type] - a[sortBy.type];
    });
  };

  return (
    <View
      style={[
        styles.container,
        Platform.OS !== "web" && isMapVisible && styles.hidden,
      ]}
    >
      <AddCity />

      <Text style={styles.sortText}>Sort by and pick filter option:</Text>
      <View style={styles.sortAndFilterContainer}>
        <View style={styles.sortContainer}>
          {Object.entries({
            temperature: "Temperature",
            windSpeed: "Wind Speed",
            clouds: "Clouds",
          } as const).map(([type, label]) => (
            <TouchableOpacity
              key={type}
              style={styles.chip}
              onPress={() =>
                setSortBy({
                  type: type as "temperature" | "windSpeed" | "clouds",
                  ascending: sortBy?.type === type ? !sortBy.ascending : false,
                })
              }
            >
              <Text style={styles.chipText}>{label}</Text>
              {sortBy?.type === type && (
                <Ionicons
                  name={sortBy.ascending ? "arrow-up" : "arrow-down"}
                  size={16}
                  color="white"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <RadioButton.Group
          onValueChange={(newValue) => setFilterOption(newValue)}
          value={filterOption}
        >
          <View style={styles.filterContainer}>
            <View style={styles.radioItem}>
              <RadioButton value="pagination" />
              <Text style={styles.radioText}>Pagination</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="full-list" />
              <Text style={styles.radioText}>Full List</Text>
            </View>
          </View>
        </RadioButton.Group>
      </View>

      <ScrollView style={styles.listContainer}>
        {!citiesList ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : filterOption === "pagination" ? (
          renderPaginatedCities().map((city) => (
            <CityListItem key={city.id} {...city} />
          ))
        ) : (
          sortedCitiesList().map((city) => (
            <CityListItem key={city.id} {...city} />
          ))
        )}
      </ScrollView>

      {filterOption === "pagination" && (
        <View style={styles.paginationContainer}>
          {Array.from({ length: pagesCount }, (_, i) => i + 1).map(
            (pageNumber) => (
              <TouchableOpacity
                key={pageNumber}
                style={[
                  styles.pageButton,
                  page === pageNumber ? styles.pageButtonActive : null,
                ]}
                onPress={() => setPage(pageNumber)}
              >
                <Text style={styles.pageButtonText}>{pageNumber}</Text>
              </TouchableOpacity>
            )
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  hidden: {
    display: "none",
  },
  sortAndFilterContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "100%",
    marginVertical: 10,
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginVertical: 10,
  },
  sortContainer: {
    display: "flex",
    flexDirection: "row",

    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 5,
  },
  sortText: {
    fontSize: 16,
    color: "white",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1976d2",
    padding: 5,
    borderRadius: 5,
  },
  chipText: {
    color: "white",
    fontWeight: "bold",
    marginRight: 5,
  },
  listContainer: {
    width: "90%",
  },
  label: {
    color: "white",
    fontSize: 16,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  radioText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  pageButton: {
    padding: 10,
    margin: 5,
    backgroundColor: "#555",
    borderRadius: 5,
  },
  pageButtonActive: {
    backgroundColor: "#1976d2",
  },
  pageButtonText: {
    color: "white",
  },
});

export default CitiesPanel;
