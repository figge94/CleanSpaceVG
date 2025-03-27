// SettingsContext – hanterar global temainställning för appen (ljust/mörkt läge)
// Temat sparas i AsyncStorage för att komma ihåg användarens val mellan sessions

import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Används för att spara lokalt på enheten
import { lightTheme, darkTheme } from "../styles/theme"; // Importerar färgteman

// Skapar en context så att andra komponenter kan komma åt temat och funktionen för att byta
export const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false); // Variabel för att hålla koll på om mörkt läge är aktiverat
  const [theme, setTheme] = useState(lightTheme); // Sätter aktuellt tema (färger m.m.)

  // useEffect körs när appen startar för att ladda tidigare sparat temaval
  useEffect(() => {
    async function loadSettings() {
      // Hämtar värde från AsyncStorage (lokalt sparat på telefonen)
      const savedDarkMode = await AsyncStorage.getItem("darkMode");
      if (savedDarkMode !== null) {
        // Om det finns ett sparat värde
        const isDark = JSON.parse(savedDarkMode); // Konverterar från JSON till boolean
        setDarkMode(isDark); // Sätter mörkt läge till det sparade värdet
        setTheme(isDark ? darkTheme : lightTheme); // Sätter tema beroende på mörkt läge
      } else {
        // Om det inte finns något sparat värde
        setTheme(lightTheme); // Sätter ljus tema som standard
      }
    }
    loadSettings(); // Anropar funktionen
  }, []);

  // Växla mellan ljust och mörkt tema och spara valet i AsyncStorage
  const toggleDarkMode = async () => {
    const newDarkMode = !darkMode; // Vänder på boolean-värdet
    setDarkMode(newDarkMode); // Sätter mörkt läge till det nya värdet
    setTheme(newDarkMode ? darkTheme : lightTheme); // Sätter tema beroende på mörkt läge

    await AsyncStorage.setItem("darkMode", JSON.stringify(newDarkMode)); // Spara nytt värde i AsyncStorage
  };

  return (
    <SettingsContext.Provider value={{ darkMode, toggleDarkMode, theme }}>
      {children}
    </SettingsContext.Provider>
  );
}
