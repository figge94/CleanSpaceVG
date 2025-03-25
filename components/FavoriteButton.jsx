import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function FavoriteButton({ value, onToggle, theme }) {
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={{
        backgroundColor: theme.buttonBackground,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
        alignSelf: "center"
      }}>
      <Text
        style={{ color: theme.buttonText, fontWeight: "bold", fontSize: 16 }}>
        {value ? "Visa alla plagg" : "Visa bara favoriter"}
      </Text>
    </TouchableOpacity>
  );
}
