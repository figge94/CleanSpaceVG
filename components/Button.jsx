import React from "react";
import { Pressable, Text } from "react-native";
import { buttonStyles } from "../styles/allStyles";

// En återanvändbar knappkomponent som anpassar sig efter valt tema och kan visa en ikon
export default function Button({ title, onPress, icon, theme, style }) {
  return (
    // Pressable används istället för TouchableOpacity för att ge bättre kontroll över tryckeffekt
    <Pressable
      // style-funktionen gör att knappen får en visuell feedback när den trycks (lite genomskinlig)
      style={({ pressed }) => [
        buttonStyles.button, // Basstil för knappen
        { backgroundColor: theme.buttonBackground, opacity: pressed ? 0.7 : 1 }, // Temafärg och tryckeffekt
        style // Tillåter ytterligare anpassning av stil via props
      ]}
      onPress={onPress} // Anropas när knappen trycks
    >
      {/* Visar en ikon om en skickas in */}
      {icon}
      <Text style={[buttonStyles.buttonText, { color: theme.buttonText }]}>
        {title}
      </Text>
    </Pressable>
  );
}
