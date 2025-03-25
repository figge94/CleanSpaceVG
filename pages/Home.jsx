import React, { useEffect, useContext, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import { SettingsContext } from "../context/SettingsContext";

import { HomeButtons, HomeIntro } from "../components";
import { globalStyles, imageStyles } from "../styles/allStyles";

SplashScreen.preventAutoHideAsync();

export default function HomeScreen({ navigation }) {
  const { theme } = useContext(SettingsContext);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      if (theme) {
        await SplashScreen.hideAsync();
        setIsReady(true);
      }
    }
    prepare();
  }, [theme]);

  if (!isReady) return null;

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
          <HomeIntro theme={theme} />
          <HomeButtons theme={theme} navigation={navigation} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
