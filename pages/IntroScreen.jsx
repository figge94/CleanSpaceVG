import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Används för att spara att introduktionen är genomförd
import Onboarding from "react-native-onboarding-swiper"; // Paket för att skapa snygga introduktionsskärmar

// IntroScreen - visas första gången man öppnar appen
export default function IntroScreen({ navigation }) {
  // När användaren är klar med introduktionen
  const handleFinishIntro = async () => {
    await AsyncStorage.setItem("hasSeenIntro", "true"); // Sparar flagga i enhetens minne
    navigation.replace("Tabs"); // Byter till huvudsidan utan möjlighet att gå tillbaka
  };

  return (
    <Onboarding
      onSkip={handleFinishIntro} // Körs om användaren trycker "Hoppa över"
      onDone={handleFinishIntro} // Körs när användaren slutför alla slides
      containerStyles={{ paddingBottom: 50 }} // Extra padding längst ner
      titleStyles={styles.title} // Stil för rubriker
      subTitleStyles={styles.subtitle} // Stil för underrubriker
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/Screenshot_20250319_201850.png")}
              style={{ width: 300, height: 490 }}
            />
          ),
          title: "Välkommen!",
          subtitle: "Få koll på vad du har i garderoben"
        },
        {
          backgroundColor: "#fdeb93",
          image: (
            <Image
              source={require("../assets/Screenshot_20250319_202239.png")}
              style={{ width: 300, height: 490 }}
            />
          ),
          title: "Tips & Statistik",
          subtitle: "Få smarta insikter om dina kläder"
        },
        {
          backgroundColor: "#e9bcbe",
          image: (
            <Image
              source={require("../assets/Screenshot_20250319_201850.png")}
              style={{ width: 300, height: 490 }}
            />
          ),
          title: "Börja nu!",
          subtitle: (
            <TouchableOpacity style={styles.button} onPress={handleFinishIntro}>
              <Text style={styles.buttonText}>Kom igång</Text>
            </TouchableOpacity>
          )
        }
      ]}
    />
  );
}

// Stilar för rubriker, text och knapp i introduktionen
const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    alignSelf: "center"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center"
  },
  subtitle: {
    fontSize: 22,
    color: "#444",
    textAlign: "center",
    paddingHorizontal: 20
  },
  button: {
    backgroundColor: "#A47864",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center"
  }
});
