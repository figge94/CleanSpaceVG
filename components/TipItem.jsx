import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Importerar ikoner
import { tipsStyles } from "../styles/allStyles";

// Aktiverar LayoutAnimation på Android (kräver extra tillåtelse) för att animera komponenter vid uppdatering av layout (t.ex. vid expandering)
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// TipItem – visar ett tipskort som går att expandera för att visa mer information
// Komponentens utseende anpassas efter valt tema och om den är expanderad eller inte
export default function TipItem({
  item,
  theme,
  expandedTipId,
  setExpandedTipId
}) {
  const isExpanded = expandedTipId === item.id; // True om detta tips är det som är expanderat

  // Växlar mellan expanderat/inte expanderat med animation
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animerar övergången
    setExpandedTipId(isExpanded ? null : item.id); // Om redan öppen: stäng, annars öppna
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8} // Minskad opacitet vid tryck
      onPress={toggleExpand} // Anropar funktionen för att expandera vid tryck
      style={[
        tipsStyles.tipCard, // Grundläggande stil för tipset
        isExpanded && tipsStyles.tipCardExpanded, // Extra stil om det är öppet
        {
          backgroundColor: theme.cardBackground, // Anpassar färg efter valt tema
          borderColor: theme.borderColor
        }
      ]}>
      {/* Titeln på tipset + pil för att expandera/minimera */}
      <View style={tipsStyles.tipHeader}>
        <Text style={[tipsStyles.tipTitle, { color: theme.text }]}>
          {item.title}
        </Text>
        <MaterialIcons
          name={isExpanded ? "expand-less" : "expand-more"} // Ikon byts beroende på tillstånd
          size={24}
          color={theme.text}
        />
      </View>
      {/* Visar tipstexten om kortet är expanderat */}
      {isExpanded && (
        <Text style={[tipsStyles.tipText, { color: theme.text }]}>
          {item.text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
