import React from "react";
import { FlatList, TouchableOpacity, Text } from "react-native";
import { tipsStyles } from "../styles/allStyles";

export default function CategorySelector({
  categories,
  selected,
  onSelect,
  theme
}) {
  return (
    <FlatList
      data={categories}
      horizontal
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={tipsStyles.categoryScroll}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onSelect(item)}
          style={[
            tipsStyles.categoryButton,
            {
              backgroundColor:
                selected === item
                  ? theme.activeButtonBackground
                  : theme.notActiveButtonBackground
            }
          ]}>
          <Text
            style={[
              tipsStyles.categoryButtonText,
              { color: theme.buttonText }
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}
