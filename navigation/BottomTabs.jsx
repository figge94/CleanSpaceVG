import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import useAppTheme from "../hooks/useAppTheme";
import getTabBarIcon from "./getTabBarIcon";
import { getScreenOptions } from "./tabOptions";

import HomeScreen from "../pages/HomeScreen";
import ClothesScreen from "../pages/ClothesScreen";
import TipsScreen from "../pages/TipsScreen";
import ProfileScreen from "../pages/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { theme } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...getScreenOptions(theme),
        tabBarIcon: ({ focused, color, size }) =>
          getTabBarIcon(route.name, focused, color, size)
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
