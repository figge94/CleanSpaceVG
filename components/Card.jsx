import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native"; // Importerar komponenter från React Native
import { MaterialIcons, EvilIcons } from "@expo/vector-icons"; // Importerar ikoner
import { cardStyles } from "../styles/styles"; // Importerar styling för kort (CardStyle)
import useFavorites from "../hooks/useFavorites";
import useAnimatedFavorite from "../hooks/useAnimatedFavorite";
import useFormattedDates from "../hooks/useFormattedDates";

// Card – visar ett kort med information om ett plagg
// Den visar om ett plagg är markerat som favorit, visar grundläggande info och navigerar vidare vid tryck.
export default function Card({ item, theme, onPress }) {
  const { isFavorite } = useFavorites();

  // När användaren trycker på hjärtat startar en skalanimation och favoritstatus ändras
  const { scaleAnim, handleFavoritePress } = useAnimatedFavorite(item._id);

  const { lastUsed } = useFormattedDates(item);

  return (
    <TouchableOpacity
      style={[cardStyles.card, { backgroundColor: theme.cardBackground }]}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={cardStyles.cardContent}>
        {/* Favorithjärta */}
        <TouchableOpacity
          onPress={handleFavoritePress}
          style={{ marginRight: 10 }}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <MaterialIcons
              name={isFavorite(item._id) ? "favorite" : "favorite-border"}
              size={24}
              color={isFavorite(item._id) ? "red" : theme.text}
            />
          </Animated.View>
        </TouchableOpacity>

        {/* Info */}
        <View style={{ flex: 1 }}>
          <Text style={[cardStyles.title, { color: theme.text }]}>
            {item.name}
          </Text>
          <Text style={{ color: theme.text }}>Skick: {item.condition}</Text>
          <Text style={{ color: theme.text }}>Senast använd: {lastUsed}</Text>
        </View>

        {/* Pil */}
        <EvilIcons
          name="chevron-right"
          size={40}
          color={theme.text}
          style={cardStyles.arrowIcon}
        />
      </View>
    </TouchableOpacity>
  );
}
