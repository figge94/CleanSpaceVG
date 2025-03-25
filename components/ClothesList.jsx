import React from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { Card } from "../components";

export default function ClothesList({
  isLoading,
  error,
  data,
  navigation,
  theme,
  onToggleFavorite,
  favorites
}) {
  if (isLoading) {
    return <ActivityIndicator size="large" color={theme.text} />;
  }

  if (error) {
    return <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>;
  }

  return (
    <View style={{ flex: 1, marginBottom: 20 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card
            key={item._id}
            item={item}
            theme={theme}
            onPress={() => navigation.navigate("Details", { item })}
            onToggleFavorite={() => onToggleFavorite(item._id)}
            isFavorite={favorites[item._id]}
          />
        )}
      />
    </View>
  );
}
