import React from "react";
import { TextInput } from "react-native";

export default function SearchBar({ value, onChange, theme }) {
  return (
    <TextInput
      placeholder="Sök plagg..."
      placeholderTextColor={theme.text}
      value={value}
      onChangeText={onChange}
      style={{
        backgroundColor: theme.cardBackground,
        color: theme.text,
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.borderColor
      }}
    />
  );
}
