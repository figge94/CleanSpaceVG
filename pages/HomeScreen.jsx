import React from "react";
import { SafeAreaView, ScrollView, View, Image, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { globalStyles, imageStyles, buttonStyles } from "../styles/styles";
import { Button } from "../components";
import { buttonText } from "../styles/utilities";

export default function HomeScreen({ navigation }) {
  const goToIntro = async () => {
    await AsyncStorage.removeItem("hasSeenIntro");
    navigation.reset({
      index: 0,
      routes: [{ name: "Intro" }]
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: globalStyles.background }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={imageStyles.headerContainer}>
          <Image
            source={require("../assets/images/headerImage.png")}
            style={imageStyles.headerImage}
          />
        </View>

        <View style={globalStyles.contentContainer}>
          <Text
            style={[globalStyles.description, { color: globalStyles.text }]}>
            <Text style={globalStyles.title}>
              Rensa enkelt, organisera smart
            </Text>
            {"\n"}
            <Text>Få full koll på din garderob snabbt och smidigt.</Text>
          </Text>

          <View style={buttonStyles.buttonContainer}>
            <Button
              title="Min garderob"
              onPress={() => navigation.navigate("Clothes")}
              icon={
                <MaterialCommunityIcons
                  name="wardrobe"
                  size={26}
                  color={buttonText}
                />
              }
            />

            <Button
              title="Visa statistik"
              onPress={() => navigation.navigate("Statistics")}
              icon={
                <MaterialCommunityIcons
                  name="chart-box"
                  size={26}
                  color={buttonText}
                />
              }
            />

            <Button
              title="Visa intro igen"
              onPress={goToIntro}
              icon={
                <MaterialCommunityIcons
                  name="restart"
                  size={26}
                  color={buttonText}
                />
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
