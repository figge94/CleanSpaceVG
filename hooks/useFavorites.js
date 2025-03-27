// hooks/useFavorites.js
import { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";

export default function useFavorites() {
  const [favorites, setFavorites] = useState({});

  // Hämtar favoriter från AsyncStorage när appen laddas
  useEffect(() => {
    async function loadFavorites() {
      const savedFavorites = await AsyncStorage.getItem("favorites");
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    }
    loadFavorites();
  }, []);

  // Uppdaterar favoritstatus
  const toggleFavorite = (itemId) => {
    const newFavorites = { ...favorites, [itemId]: !favorites[itemId] };
    setFavorites(newFavorites);
    AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
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
