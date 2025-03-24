import React from "react";
import { Text, View } from "react-native";
import { DetailStyle } from "../../styles/pages/DetailStyle";

export default function DetailNotes({ notes, theme }) {
  if (!notes) return null;

  return (
    <View
      style={[
        DetailStyle.noteContainer,
        { backgroundColor: theme.cardBackground }
      ]}>
      <Text style={[DetailStyle.sectionTitle, { color: theme.text }]}>
        Noteringar:
      </Text>
      <View
        style={{
          backgroundColor:
            theme.background === "#121212" ? "#1A1A1A" : "#f5f5f5",
          borderColor: theme.borderColor,
          padding: 10,
          borderRadius: 6
        }}>
        <Text style={[DetailStyle.notes, { color: theme.text }]}>{notes}</Text>
      </View>
    </View>
  );
}
