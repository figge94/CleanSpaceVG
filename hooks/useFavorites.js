import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useFavorites() {
  const [favorites, setFavorites] = useState({});

  // Hämtar favoriter från AsyncStorage när appen laddas
  useEffect(() => {
    async function loadFavorites() {
      try {
        const savedFavorites = await AsyncStorage.getItem("favorites");
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error("Failed to load favorites:", error);
        // Hantera fel vid hämtning av data
      }
    }
    loadFavorites();
  }, []);

  // Uppdaterar favoritstatus
  const toggleFavorite = async (itemId) => {
    try {
      const newFavorites = { ...favorites, [itemId]: !favorites[itemId] };
      setFavorites(newFavorites);
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Failed to update favorites:", error);
      // Hantera fel vid uppdatering av data
    }
  };

  // Returnerar antal favoriter
  const getFavoriteCount = () =>
    Object.values(favorites).filter(Boolean).length;

  // Kollar om ett objekt är favorit
  const isFavorite = (itemId) => !!favorites[itemId];

  return {
    favorites, // Själva datan
    toggleFavorite, // För att lägga till eller ta bort favorit
    getFavoriteCount, // Enkel statistik
    isFavorite // Kontrollera favoritstatus
  };
}
