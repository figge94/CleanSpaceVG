import React from "react";
import { View, Text } from "react-native";
import { statisticStyles } from "../styles/screensStyles";

export default function StatCard({ title, value, theme }) {
  return (
    <View
      style={[
        statisticStyles.card,
        {
          backgroundColor: theme.cardBackground,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3
        }
      ]}>
      <Text style={[statisticStyles.statTitle, { color: theme.text }]}>
        {title}
      </Text>
      <Text style={[statisticStyles.statValue, { color: theme.text }]}>
        {value}
      </Text>
    </View>
  );
}
