import React from "react";
import { FlatList, TouchableOpacity, Text } from "react-native";
import { TipsStyle } from "../../styles/screens/tipsStyles";

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
      contentContainerStyle={TipsStyle.categoryScroll}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onSelect(item)}
          style={[
            TipsStyle.categoryButton,
            {
              backgroundColor:
                selected === item
                  ? theme.activeButtonBackground
                  : theme.notActiveButtonBackground
            }
          ]}>
          <Text
            style={[TipsStyle.categoryButtonText, { color: theme.buttonText }]}>
            {item}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}
