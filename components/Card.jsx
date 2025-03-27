import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { MaterialIcons, EvilIcons } from "@expo/vector-icons";
import { cardStyles } from "../styles/styles";
import useFavorites from "../hooks/useFavorites";
import useAnimatedFavorite from "../hooks/useAnimatedFavorite";
import useFormattedDates from "../hooks/useFormattedDates";
import { theme } from "../styles/styles";

export default function Card({ item, onPress }) {
  const { favorites, toggleFavorite } = useFavorites(); // Hämta favorites och toggleFavorite
  const { scaleAnim, handleFavoritePress } = useAnimatedFavorite(item._id);
  const { lastUsed } = useFormattedDates(item);

  // Kontrollera om objektet är favoriter baserat på favorites
  const isFavorite = favorites[item._id];

  const handleFavoriteToggle = () => {
    handleFavoritePress(); // Animering
    toggleFavorite(item._id); // Toggla favorit
  };

  return (
    <TouchableOpacity
      style={[cardStyles.card, { backgroundColor: theme.cardBackground }]}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={cardStyles.cardContent}>
        {/* Favorithjärta */}
        <TouchableOpacity
          onPress={handleFavoriteToggle} // Hantera klick för att toggla favoritstatus
          style={{ marginRight: 10 }}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <MaterialIcons
              name={isFavorite ? "favorite" : "favorite-border"}
              size={24}
              color={isFavorite ? "red" : theme.text} // Färga om objektet är favorit
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
