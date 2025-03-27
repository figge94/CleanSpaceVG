import { useRef } from "react";
import { Animated } from "react-native";
import useFavorites from "./useFavorites";

/**
 * Hook som hanterar favorit-animation och toggle-funktion
 * @param {string} itemId - ID för plagget
 * @returns {Object} - { scaleAnim, handleFavoritePress }
 */
export default function useAnimatedFavorite(itemId) {
  const { toggleFavorite } = useFavorites();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleFavoritePress = () => {
    // Skala upp och tillbaka animation för favorit-tryck
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true // Bra att sätta på true för att optimera animationen
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true
      })
    ]).start();

    // Toggla favoritstatus
    toggleFavorite(itemId);
  };

  return { scaleAnim, handleFavoritePress };
}
