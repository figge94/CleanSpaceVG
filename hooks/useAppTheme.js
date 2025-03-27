import { useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "../styles/theme"; // Importera färgteman

export default function useAppTheme() {
  const systemColorScheme = useColorScheme(); // Hämta systemets nuvarande tema
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Ladda tidigare preferens från AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      const storedPreference = await AsyncStorage.getItem("themePreference");
      if (storedPreference === "dark") setIsDarkMode(true);
      else if (storedPreference === "light") setIsDarkMode(false);
      else setIsDarkMode(systemColorScheme === "dark");
    };
    loadTheme();
  }, [systemColorScheme]);

  // Växla tema
  const toggleDarkMode = async () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    await AsyncStorage.setItem("themePreference", newValue ? "dark" : "light");
  };

  // Tilldela rätt temaobjekt baserat på darkMode-status
  const theme = isDarkMode ? darkTheme : lightTheme;

  return { isDarkMode, toggleDarkMode, theme };
}
