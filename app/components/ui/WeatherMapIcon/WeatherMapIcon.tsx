import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { CityListItemProps } from "../../../../types/cityTypes";

//unfortunately something is not working, the text and image on custom marker is being cut
const WeatherMapIcon = ({ name, temperature, icon }: CityListItemProps) => {
    return (
        <View style={styles.container}>
            {/* <Image
                source={{ uri: `http://openweathermap.org/img/wn/${icon}@2x.png` }}
                style={styles.icon}
                resizeMode={'contain'}
            /> */}
            {/* <View style={styles.textContainer}> */}
            <Text style={styles.tempText}>{`${Math.floor(temperature - 273)}°C`}</Text>
            {/* <Text style={styles.cityText}>{name}</Text> */}
            {/* </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // display: 'flex',
        // width: 130,
        // height: "auto",
        borderRadius: 10,
        backgroundColor: "white",
        flexDirection: "row",
        // justifyContent: "center",
        // alignItems: "center",
        padding: 3,
        // paddingVertical: 8,
        width: 'auto',
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        // overflow: 'visible'
    },
    icon: {
        width: 40,
        height: 40,
    },
    textContainer: {
        flexDirection: "column",
        marginLeft: 5,
    },
    tempText: {
        fontSize: 14, // Możesz dostosować
        fontWeight: "bold",
    },
    cityText: {
        fontSize: 12, // Możesz dostosować
        textAlign: "center",
    },
});

export default WeatherMapIcon;
