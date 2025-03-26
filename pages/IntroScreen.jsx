import React, { useRef, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Används för att spara att introduktionen är genomförd
import Onboarding from "react-native-onboarding-swiper"; // Paket för att skapa snygga introduktionsskärmar
import { buttonStyles, globalStyles, imageStyles } from "../styles/styles";
import { Button } from "../components";

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
      titleStyles={globalStyles.title} // Stil för rubriker
      subTitleStyles={globalStyles.text} // Stil för underrubriker
      bottomBarHighlight={false}
      pages={[
        {
          backgroundColor: "#D9C7BF",
          image: (
            <Animated.View style={{ opacity: fadeAnim }}>
              <Image
                source={require("../assets/Screenshot_20250319_201850.png")}
                style={imageStyles.introImage}
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
                style={imageStyles.introImage}
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
              style={imageStyles.introImage}
            />
          ),
          title: "Börja nu!",
          subtitle: (
            <Button onPress={handleFinishIntro} style={buttonStyles.button}>
              Kom igång
            </Button>
          )
        }
      ]}
    />
  );
}
