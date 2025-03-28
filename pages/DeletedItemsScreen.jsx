// screens/DeletedItemsScreen.jsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles, theme } from "../styles/styles";

export default function DeletedItemsScreen() {
  const [deletedItems, setDeletedItems] = useState([]);

  useEffect(() => {
    const loadDeletedItems = async () => {
      try {
        const stored = await AsyncStorage.getItem("deletedItems");
        if (stored) {
          const parsed = JSON.parse(stored);
          const sorted = parsed.sort(
            (a, b) => new Date(b.deletedAt) - new Date(a.deletedAt)
          );
          setDeletedItems(sorted);
        }
      } catch (e) {
        console.error("Kunde inte läsa raderade plagg", e);
      }
    };

    loadDeletedItems();
  }, []);

  if (deletedItems.length === 0) {
    return (
      <View style={[globalStyles.container]}>
        <Text style={[globalStyles.title]}>Inga rensade plagg</Text>
      </View>
    );
  }

  return (
    <View
      style={[globalStyles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={deletedItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              borderRadius: 10,
              backgroundColor: "#fff",
              marginBottom: 10
            }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.name}
            </Text>
            <Text style={{ opacity: 0.8 }}>
              {item.category?.main || "Ingen kategori"}
            </Text>
            <Text style={{ fontSize: 13, marginTop: 4 }}>
              Rensad: {new Date(item.deletedAt).toLocaleDateString("sv-SE")}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
