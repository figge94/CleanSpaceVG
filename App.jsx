import React from "react";
import {
  NavigationContainer,
  DefaultTheme as NavDefaultTheme,
  DarkTheme as NavDarkTheme
} from "@react-navigation/native";
import { SettingsProvider } from "./context/SettingsContext";
import AppNavigator from "./navigation/AppNavigator";
import useAppTheme from "./hooks/useAppTheme";

// Anpassade färgteman baserat på React Navigation’s grundteman
const MyLightTheme = {
  ...NavDefaultTheme,
  colors: {
    ...NavDefaultTheme.colors,
    background: "#ece3df",
    text: "#000",
    cardBackground: "#fff",
    buttonBackground: "#A47864",
    buttonText: "#fff",
    border: "#d9c7bf",
    headerText: "#fff",
    activeButtonBackground: "#A47864",
    notActiveButtonBackground: "#d9c7bf",
    tagBackground: "#AC9C95"
  }
};

const MyDarkTheme = {
  ...NavDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    background: "#121212",
    text: "#EAEAEA",
    cardBackground: "#242424",
    buttonBackground: "#444",
    buttonText: "#FFF",
    border: "#666",
    headerText: "#FFF",
    activeButtonBackground: "#A86D5D",
    notActiveButtonBackground: "#3A2C28",
    tagBackground: "#242424"
  }
};

function AppContent() {
  const { isDarkMode } = useAppTheme();
  const theme = isDarkMode ? MyDarkTheme : MyLightTheme;

  return (
    <NavigationContainer theme={theme}>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}
