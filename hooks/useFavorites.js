import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useFavorites() {
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const saved = await AsyncStorage.getItem("favorites");
        if (saved) setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Kunde inte ladda favoriter", e);
      }
    };
    loadFavorites();
  }, []);

  const toggleFavorite = async (itemId) => {
    const updated = {
      ...favorites,
      [itemId]: !favorites[itemId]
    };
    setFavorites(updated);
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(updated));
    } catch (e) {
      console.error("Kunde inte spara favoriter", e);
    }
  };

  const getFavoriteCount = () =>
    Object.values(favorites).filter(Boolean).length;

  const isFavorite = (itemId) => !!favorites[itemId];

  return {
    favorites, // Själva datan
    toggleFavorite, // För att lägga till eller ta bort favorit
    getFavoriteCount, // Enkel statistikhjälp
    isFavorite
  };
}
