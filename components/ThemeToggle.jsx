// components/ThemeToggle.js
import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import useAppTheme from "../hooks/useAppTheme";
import { DarkTheme } from "@react-navigation/native";

export default function ThemeToggle({ style }) {
  const { theme } = useAppTheme();

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
