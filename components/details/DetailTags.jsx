import React from "react";
import { Text, View } from "react-native";
import { TagStyle } from "../../styles/TagStyle";

export default function DetailTags({ tags, theme }) {
  if (!tags || tags.length === 0) return null;

  return (
    <View style={TagStyle.tagContainer}>
      {tags.map((tag, index) => (
        <View
          key={index}
          style={[TagStyle.tag, { backgroundColor: theme.tagBackground }]}>
          <Text style={[TagStyle.tagText, { color: theme.buttonText }]}>
            {tag}
          </Text>
        </View>
      ))}
    </View>
  );
}
