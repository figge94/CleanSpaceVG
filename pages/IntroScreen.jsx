import React, { useRef, useEffect } from "react";
import { Text, StyleSheet, Image, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "react-native-onboarding-swiper";

import { buttonStyles, globalStyles, imageStyles } from "../styles/styles";
import { Button } from "../components";
import { theme } from "../styles/styles";

export default function IntroScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleFinishIntro = async () => {
    await AsyncStorage.setItem("hasSeenIntro", "true");
    navigation.replace("Tabs");
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <Onboarding
      onSkip={handleFinishIntro}
      onDone={handleFinishIntro}
      showNext={true}
      bottomBarHighlight={false}
      containerStyles={globalStyles.introContainer}
      titleStyles={[globalStyles.title, { color: theme.text }]} // Behåll som array eftersom den blandar styles
      subTitleStyles={{ ...globalStyles.text, color: theme.text }} // Skicka som ett objekt här
      pages={[
        {
          backgroundColor: theme.background,
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
          backgroundColor: theme.background,
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
          backgroundColor: theme.background,
          image: (
            <Image
              source={require("../assets/Screenshot_20250319_201850.png")}
              style={imageStyles.introImage}
            />
          ),
          title: "Börja nu!",
          subtitle: "" // Vi hanterar knappen separat
        }
      ]}
      bottomBarChildren={
        <Button
          title="Kom igång"
          onPress={handleFinishIntro}
          style={{ marginBottom: 20 }}
        />
      }
    />
  );
}
