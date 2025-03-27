import React, { useContext } from "react";
import { SafeAreaView, ScrollView, View, Image, Text } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { SettingsContext } from "../context/SettingsContext";
import { globalStyles, imageStyles, buttonStyles } from "../styles/styles";
import { Button } from "../components";

export default function HomeScreen({ navigation }) {
  const { theme } = useContext(SettingsContext);

  const goToIntro = async () => {
    await AsyncStorage.removeItem("hasSeenIntro");
    navigation.reset({
      index: 0,
      routes: [{ name: "Intro" }]
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={imageStyles.headerContainer}>
          <Image
            source={require("../assets/wardrobe.png")}
            style={imageStyles.wardrobeImage}
          />
        </View>

        <View style={globalStyles.contentContainer}>
          <Text style={[globalStyles.description, { color: theme.text }]}>
            <Text style={globalStyles.title}>
              Rensa enkelt, organisera smart
            </Text>
            {"\n"}
            <Text style={globalStyles.introText}>
              Få full koll på din garderob snabbt och smidigt.
            </Text>
          </Text>

          <View style={buttonStyles.buttonContainer}>
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

            <Button
              title="Visa intro igen"
              onPress={goToIntro}
              theme={theme}
              icon={
                <MaterialCommunityIcons
                  name="restart"
                  size={26}
                  color={theme.buttonText}
                />
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
