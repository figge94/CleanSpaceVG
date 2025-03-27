import React from "react";
import {
  NavigationContainer,
  DefaultTheme as NavDefaultTheme,
  DarkTheme as NavDarkTheme
} from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import useAppTheme from "./hooks/useAppTheme";

function AppContent() {
  // Hämta temat från useAppTheme-hooken
  const { theme } = useAppTheme();

  return (
    <NavigationContainer theme={theme}>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return <AppContent />;
}
