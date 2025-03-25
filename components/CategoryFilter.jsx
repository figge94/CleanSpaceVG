import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
  theme
}) {
  return (
    <View style={{ marginBottom: 15, paddingHorizontal: 10 }}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => {
          const isSelected = selected === item;
          return (
            <TouchableOpacity
              onPress={() => onSelect(item)}
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
  );
}
