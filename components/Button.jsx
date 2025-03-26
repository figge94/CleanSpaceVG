import React from "react";
import { Pressable, Text, View } from "react-native";
import { buttonStyles } from "../styles/styles";

// En återanvändbar knappkomponent som anpassar sig efter valt tema och kan visa en ikon
export default function Button({ title, onPress, icon, theme, style }) {
  return (
    <Pressable
      style={({ pressed }) => [
        buttonStyles.button,
        {
          backgroundColor: theme.buttonBackground,
          opacity: pressed ? 0.7 : 1
        },
        style
      ]}
      onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
        <Text style={[buttonStyles.buttonText, { color: "white" }]}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
