import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native"; // Importerar komponenter från React Native
import EvilIcons from "@expo/vector-icons/EvilIcons"; // Importerar ikoner
import MaterialIcons from "@expo/vector-icons/MaterialIcons"; // Importerar ikoner
import { CardStyle } from "../styles/CardStyle"; // Importerar styling för kort (CardStyle)
import { useRef } from "react"; // Importerar useRef för att skapa en referens till en variabel

// Card – visar ett kort med information om ett plagg
// Den visar om ett plagg är markerat som favorit, visar grundläggande info och navigerar vidare vid tryck.
export default function Card({
  item,
  theme,
  onPress,
  onToggleFavorite,
  hasQRCode,
  isFavorite
}) {
  // Skapar en animationseffekt när man trycker på hjärtat
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // När användaren trycker på hjärtat startar en skalanimation och favoritstatus ändras
  const handleFavoritePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true
      })
    ]).start();

    onToggleFavorite(); // Uppdaterar favoritstatus
  };

  return (
    // Hela kortet är tryckbart, navigerar till detaljer
    <TouchableOpacity
      style={[CardStyle.card, { backgroundColor: theme.cardBackground }]}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={CardStyle.cardContent}>
        {/* Sektion till vänster – visar ett hjärta som markerar favoriter */}
        <TouchableOpacity
          onPress={handleFavoritePress}
          style={{ marginRight: 10 }}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <MaterialIcons
              name={isFavorite ? "favorite" : "favorite-border"}
              size={24}
              color={isFavorite ? "red" : theme.text}
            />
          </Animated.View>
        </TouchableOpacity>

        {/* Sektionen i mitten – visar namn, skick och senast använd */}
        <View style={{ flex: 1 }}>
          <Text style={[CardStyle.title, { color: theme.text }]}>
            {item.name}
          </Text>

          <Text style={[CardStyle.text, { color: theme.text }]}>
            Skick: {item.condition}
          </Text>
          <Text style={[CardStyle.text, { color: theme.text }]}>
            Senast använd:{" "}
            {item.lastUsed
              ? new Date(item.lastUsed).toLocaleDateString("sv-SE")
              : "Okänt"}
          </Text>
        </View>

        {/* Sektionen till höger – pil som indikerar att man kan klicka vidare */}
        <EvilIcons
          name="chevron-right"
          size={40}
          color={theme.text}
          style={CardStyle.arrowIcon}
        />
      </View>
    </TouchableOpacity>
  );
}
