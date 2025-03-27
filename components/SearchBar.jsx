import React from "react";
import { TextInput } from "react-native";
import useSettings from "../hooks/useSettings";
import { globalStyles } from "../styles/styles";

export default function SearchBar({ value, onChange }) {
  const { theme } = useSettings();

  return (
    <TextInput
      placeholder="Sök plagg..."
      placeholderTextColor={theme.text}
      value={value}
      onChangeText={onChange}
      style={[
        globalStyles.searchInput,
        {
          backgroundColor: theme.cardBackground,
          color: theme.text,
          borderColor: theme.borderColor
        }
      ]}
    />
  );
}
