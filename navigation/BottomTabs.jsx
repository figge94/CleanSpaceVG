import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SettingsContext } from "../context/SettingsContext";
import getTabBarIcon from "./getTabBarIcon";

import HomeScreen from "../pages/Home";
import ClothesScreen from "../pages/Clothes";
import TipsScreen from "../pages/Tips";
import ProfileScreen from "../pages/Profile";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { theme } = useContext(SettingsContext);

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
