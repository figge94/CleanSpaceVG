import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from "@react-navigation/native";
import { SettingsProvider, SettingsContext } from "./context/SettingsContext";
import AppNavigator from "./navigation/AppNavigator";

function AppContent() {
  const { darkMode } = React.useContext(SettingsContext);
  return (
    <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
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
