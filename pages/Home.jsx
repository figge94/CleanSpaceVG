import React, { useEffect, useContext, useState } from "react";
import { Text, View, Image, SafeAreaView, ScrollView } from "react-native";
import * as SplashScreen from "expo-splash-screen"; // För att kontrollera när splash-skärmen ska döljas
import { SettingsContext } from "../context/SettingsContext"; // Hanterar ljust/mörkt tema
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { GlobalStyle } from "../styles/global/GlobalStyle"; // Global styling
import wardrobeImg from "../assets/wardrobe.png"; // Bild i toppen av startsidan
import Button from "../components/Button"; // Återanvändbar knappkomponent
import { ImageStyle } from "../styles/ImageStyle";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Lokal lagring för t.ex. introflaggor

// Hindrar att splash-screen försvinner automatiskt vid appstart
SplashScreen.preventAutoHideAsync();

// Startsida för appen. Visar introduktionstext, bild och navigeringsknappar
export default function HomeScreen({ navigation }) {
  const { theme } = useContext(SettingsContext); // Hämtar färgtema från Context
  const [isReady, setIsReady] = useState(false); // Används för att visa sidan först när splash-screen döljs

  // När temat är laddat, döljs splash-screen manuellt
  useEffect(() => {
    async function prepare() {
      if (theme) {
        await SplashScreen.hideAsync();
        setIsReady(true);
      }
    }
    prepare();
  }, [theme]);

  // Visar inget förrän splash-screen döljs
  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header-bild */}
        <View style={ImageStyle.headerContainer}>
          <Image source={wardrobeImg} style={ImageStyle.wardrobeImage} />
        </View>

        {/* Introduktionstext och knappar */}
        <View style={GlobalStyle.contentContainer}>
          <Text style={[GlobalStyle.description, { color: theme.text }]}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              Rensa enkelt, organisera smart
            </Text>
            {"\n"} {/* Radbrytning */}
            <Text style={{ fontSize: 18, opacity: 0.8 }}>
              Få full koll på din garderob snabbt och smidigt.
            </Text>
          </Text>

          <View style={GlobalStyle.buttonContainer}>
            {/* Navigering till garderobssidan */}
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

            {/* Navigering till statistiksidan */}
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

            {/* Tar bort flaggan för intro och visar den igen */}
            <Button
              title="Visa intro igen"
              onPress={async () => {
                await AsyncStorage.removeItem("hasSeenIntro");
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Intro" }]
                });
              }}
              theme={theme}
            />

            {/* Navigering till QR-/streckkodsskanner */}
            <Button
              title="Skanna streckkod"
              onPress={() => navigation.navigate("BarcodeScanner")}
              icon={
                <MaterialCommunityIcons
                  name="chart-box"
                  size={26}
                  color={theme.buttonText}
                />
              }
              theme={theme}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
