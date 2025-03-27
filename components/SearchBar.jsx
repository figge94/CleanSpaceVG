import React from "react";
import { TextInput } from "react-native";

import { globalStyles, theme } from "../styles/styles";

export default function SearchBar({ value, onChange }) {
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
