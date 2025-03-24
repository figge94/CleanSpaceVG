import React from "react";
import { View, Text } from "react-native";
import { StatisticStyle } from "../../styles/pages/StatisticStyle";

export default function StatCard({ title, value, theme }) {
  return (
    <View
      style={[
        StatisticStyle.card,
        {
          backgroundColor: theme.cardBackground,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3
        }
      ]}>
      <Text style={[StatisticStyle.statTitle, { color: theme.text }]}>
        {title}
      </Text>
      <Text style={[StatisticStyle.statValue, { color: theme.text }]}>
        {value}
      </Text>
    </View>
  );
}
