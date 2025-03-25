import React from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../Button";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { globalStyles } from "../../styles/globalStyles";

export default function HomeButtons({ theme, navigation }) {
  const goToIntro = async () => {
    await AsyncStorage.removeItem("hasSeenIntro");
    navigation.reset({
      index: 0,
      routes: [{ name: "Intro" }]
    });
  };

  return (
    <View style={globalStyles.buttonContainer}>
      <Button
        title="Min garderob"
        onPress={() => navigation.navigate("Clothes")}
        icon={
          <MaterialCommunityIcons
            name="wardrobe"
            size={26}
            color={theme.buttonText}
          />
        }
        theme={theme}
      />

      <Button
        title="Visa statistik"
        onPress={() => navigation.navigate("Statistics")}
        icon={
          <MaterialCommunityIcons
            name="chart-box"
            size={26}
            color={theme.buttonText}
          />
        }
        theme={theme}
      />

      <Button title="Visa intro igen" onPress={goToIntro} theme={theme} />
    </View>
  );
}
