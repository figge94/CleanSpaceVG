// components/ThemeToggle.js
import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { DarkTheme } from "@react-navigation/native";

export default function ThemeToggle({ style }) {
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
