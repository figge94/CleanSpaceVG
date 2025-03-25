import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { buttonStyles } from "../styles/allStyles";

export default function showFavoritesButton({ value, onToggle, theme }) {
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[
        buttonStyles.favoriteButton,
        { backgroundColor: theme.buttonBackground }
      ]}>
      <Text
        style={{ color: theme.buttonText, fontWeight: "bold", fontSize: 16 }}>
        {value ? "Visa alla plagg" : "Visa bara favoriter"}
      </Text>
    </TouchableOpacity>
  );
}
