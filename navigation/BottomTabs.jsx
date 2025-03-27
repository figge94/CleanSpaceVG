import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import useSettings from "../hooks/useSettings";
import getTabBarIcon from "./getTabBarIcon";

import HomeScreen from "../pages/HomeScreen";
import ClothesScreen from "../pages/ClothesScreen";
import TipsScreen from "../pages/TipsScreen";
import ProfileScreen from "../pages/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { theme } = useSettings();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) =>
          getTabBarIcon(route.name, focused, color, size),
        tabBarActiveTintColor: theme.buttonBackground,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: theme.cardBackground,
          paddingBottom: 5,
          height: 60,
          position: "absolute"
        }
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Hem" }}
      />
      <Tab.Screen
        name="Clothes"
        component={ClothesScreen}
        options={{ title: "Min garderob" }}
      />
      <Tab.Screen
        name="Tips"
        component={TipsScreen}
        options={{ title: "Tips" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profil" }}
      />
    </Tab.Navigator>
  );
}
