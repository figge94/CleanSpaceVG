// components/ThemeToggle.js
import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import useSettings from "./hooks/useSettings";
import { DarkTheme } from "@react-navigation/native";

export default function ThemeToggle({ style }) {
  const { theme } = useSettings();

  return (
    <TouchableOpacity onPress={toggleDarkMode} style={style}>
      <MaterialIcons
        name={DarkTheme ? "wb-sunny" : "nights-stay"}
        size={24}
        color={theme.text}
      />
    </TouchableOpacity>
  );
}
