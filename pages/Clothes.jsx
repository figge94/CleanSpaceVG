import React, { useContext, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { SettingsContext } from "../context/SettingsContext";
import { globalStyles } from "../styles/globalStyles";
import { useClothes } from "../data/apiData";
import CategoryFilter from "../components/clothes/CategoryFilter";
import FavoriteToggleButton from "../components/clothes/FavoriteToggleButton";
import SearchBar from "../components/clothes/SearchBar";
import ClothesList from "../components/clothes/ClothesList";
import AddClothesModal from "../components/clothes/AddClothesModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ClothesScreen({ navigation }) {
  const { theme } = useContext(SettingsContext);
  const { data, isLoading, error, refetch, deleteItem } = useClothes();
  const [selectedCategory, setSelectedCategory] = useState("Alla");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState({});
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const categories = [
    "Alla",
    ...new Set(data.map((item) => item.category?.main || "Okänd"))
  ];

  const filteredData = data.filter((item) => {
    const matchKategori =
      selectedCategory === "Alla" || item.category?.main === selectedCategory;
    const matchSökning = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const isFavorite = favorites[item._id];
    return matchKategori && matchSökning && (!showOnlyFavorites || isFavorite);
  });

  const toggleFavorite = async (itemId) => {
    const newFavorites = {
      ...favorites,
      [itemId]: !favorites[itemId]
    };
    setFavorites(newFavorites);
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
    } catch (e) {
      console.error("Kunde inte spara favoriter", e);
    }
  };

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem("favorites");
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (e) {
        console.error("Kunde inte ladda favoriter", e);
      }
    };
    loadFavorites();
  }, []);

  return (
    <View
      style={[globalStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[globalStyles.title, { color: theme.text }]}>
        Min garderob
      </Text>

      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        theme={theme}
      />

      <FavoriteToggleButton
        theme={theme}
        value={showOnlyFavorites}
        onToggle={() => setShowOnlyFavorites(!showOnlyFavorites)}
      />

      <SearchBar value={searchQuery} onChange={setSearchQuery} theme={theme} />

      <ClothesList
        isLoading={isLoading}
        error={error}
        data={filteredData}
        navigation={navigation}
        theme={theme}
        onToggleFavorite={toggleFavorite}
        favorites={favorites}
      />

      <AddClothesModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        theme={theme}
      />
    </View>
  );
}
