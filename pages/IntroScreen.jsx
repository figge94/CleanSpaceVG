import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Används för att spara att introduktionen är genomförd
import Onboarding from "react-native-onboarding-swiper"; // Paket för att skapa snygga introduktionsskärmar

// IntroScreen - visas första gången man öppnar appen
export default function IntroScreen({ navigation }) {
  // När användaren är klar med introduktionen
  const handleFinishIntro = async () => {
    await AsyncStorage.setItem("hasSeenIntro", "true"); // Sparar flagga i enhetens minne
    navigation.replace("Tabs"); // Byter till huvudsidan utan möjlighet att gå tillbaka
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <Onboarding
      onSkip={handleFinishIntro} // Körs om användaren trycker "Hoppa över"
      onDone={handleFinishIntro} // Körs när användaren slutför alla slides
      showNext={true}
      showDone={false}
      containerStyles={{ paddingBottom: 50 }} // Extra padding längst ner
      titleStyles={styles.title} // Stil för rubriker
      subTitleStyles={styles.subtitle} // Stil för underrubriker
      bottomBarHighlight={false}
      pages={[
        {
          backgroundColor: "#D9C7BF",
          image: (
            <Animated.View style={{ opacity: fadeAnim }}>
              <Image
                source={require("../assets/Screenshot_20250319_201850.png")}
                style={{ width: 300, height: 490 }}
              />
            </Animated.View>
          ),
          title: "Välkommen till CleanSpace",
          subtitle: "Din smarta hjälpreda för att rensa garderoben"
        },
        {
          backgroundColor: "#D0B9AF",
          image: (
            <Animated.View style={{ opacity: fadeAnim }}>
              <Image
                source={require("../assets/Screenshot_20250319_202239.png")}
                style={{ width: 300, height: 490 }}
              />
            </Animated.View>
          ),
          title: "Statistik & tips",
          subtitle:
            "Se vilka plagg du använder – och få smarta organiseringstips"
        },

        {
          backgroundColor: "#C6AB9F",
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
    width: 300,
    height: 490,
    resizeMode: "contain"
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    paddingHorizontal: 20
  },
  subtitle: {
    fontSize: 18,
    color: "#444",
    textAlign: "center",
    paddingHorizontal: 30
  },
  button: {
    backgroundColor: "#A47864",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: "center"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});
