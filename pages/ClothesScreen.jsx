import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Switch
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useClothes } from "../data/apiData";
import { buttonStyles, globalStyles, theme } from "../styles/styles";
import { AddModal, Card } from "../components";
import SearchBar from "../components/SearchBar";
import useFilteredClothes from "../hooks/useFilteredClothes";
import useFavorites from "../hooks/useFavorites";

export default function ClothesScreen({ navigation }) {
  const { data, isLoading, error } = useClothes();
  const [selectedCategory, setSelectedCategory] = useState("Alla");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();

  const { categories, filteredData } = useFilteredClothes(
    data,
    searchQuery,
    selectedCategory,
    showOnlyFavorites,
    favorites
  );

  return (
    <View
      style={[globalStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[globalStyles.title, { color: theme.text }]}>
        Min garderob
      </Text>

      {/* CategoryFilter inbakad */}
      <View style={{ marginBottom: 15, paddingHorizontal: 10 }}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item }) => {
            const isSelected = selectedCategory === item;
            return (
              <TouchableOpacity
                onPress={() => setSelectedCategory(item)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginHorizontal: 3,
                  borderRadius: 8,
                  backgroundColor: isSelected
                    ? theme.buttonBackground
                    : theme.cardBackground,
                  borderWidth: 1,
                  borderColor: theme.borderColor,
                  elevation: isSelected ? 4 : 0
                }}>
                <Text
                  style={{
                    color: isSelected ? "#fff" : theme.text,
                    fontWeight: "bold",
                    fontSize: 16,
                    textAlign: "center"
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Inbakad FavoriteButton */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10
        }}>
        <Text style={{ color: theme.text, marginRight: 10 }}>
          Visa endast favoriter
        </Text>
        <Switch
          value={showOnlyFavorites}
          onValueChange={() => setShowOnlyFavorites(!showOnlyFavorites)}
          trackColor={{ false: "#ccc", true: theme.buttonBackground }}
          thumbColor={theme.buttonText}
        />
      </View>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <View style={{ flex: 1, marginBottom: 20 }}>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.text} />
        ) : error ? (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Card
                key={item._id}
                item={item}
                theme={theme}
                onPress={() => navigation.navigate("Details", { item })}
                onToggleFavorite={() => toggleFavorite(item._id)} // Anropar toggleFavorite här
                isFavorite={favorites[item._id]} // Skickar favoritstatus
              />
            )}
          />
        )}
      </View>

      <AddModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        theme={theme}
      />

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={buttonStyles.addButton}>
        <MaterialIcons name="add" size={30} color={theme.buttonText} />
      </TouchableOpacity>
    </View>
  );
}
