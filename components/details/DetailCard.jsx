import React from "react";
import { Text, View } from "react-native";
import { DetailStyle } from "../../styles/pages/DetailStyle";

export default function DetailCard({ item, theme }) {
  return (
    <View
      style={[
        DetailStyle.detailsCard,
        { backgroundColor: theme.cardBackground }
      ]}>
      <Text style={[DetailStyle.sectionTitle, { color: theme.text }]}>
        Kategori:
      </Text>
      <Text style={[DetailStyle.content, { color: theme.text }]}>
        {item.category?.main} / {item.category?.sub}
      </Text>
      <Text style={[DetailStyle.sectionTitle, { color: theme.text }]}>
        Skick:
      </Text>
      <Text style={[DetailStyle.content, { color: theme.text }]}>
        {item.condition}
      </Text>
      <Text style={[DetailStyle.sectionTitle, { color: theme.text }]}>
        Senast använd:
      </Text>
      <Text style={[DetailStyle.content, { color: theme.text }]}>
        {item.lastUsed
          ? new Date(item.lastUsed).toLocaleDateString("sv-SE")
          : "Okänt"}
      </Text>
    </View>
  );
}
