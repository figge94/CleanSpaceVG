import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

import BottomTabs from "./BottomTabs";
import IntroScreen from "../pages/IntroScreen";
import DetailsScreen from "../pages/Details";
import StatisticsScreen from "../pages/Statistic";
import ClothesScreen from "../pages/Clothes";

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkIntro = async () => {
      const seen = await AsyncStorage.getItem("hasSeenIntro");
      setInitialRoute(seen === "true" ? "Tabs" : "Intro");
      await SplashScreen.hideAsync();
    };
    checkIntro();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="Intro"
        component={IntroScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Clothes"
        component={ClothesScreen}
        options={{ title: "Min garderob" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: "Detaljer" }}
      />
      <Stack.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{ title: "Statistik" }}
      />
    </Stack.Navigator>
  );
}
