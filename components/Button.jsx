import React from "react";
import { Pressable, Text, View } from "react-native";
import { buttonStyles } from "../styles/styles";
import useSettings from "../hooks/useSettings";

export default function Button({ title, onPress, icon, style, disabled }) {
  const { theme } = useSettings();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        buttonStyles.button,
        {
          backgroundColor: disabled ? "#999" : theme.buttonBackground,
          opacity: pressed ? 0.7 : 1
        },
        style
      ]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
        <Text style={[buttonStyles.buttonText, { color: theme.buttonText }]}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
