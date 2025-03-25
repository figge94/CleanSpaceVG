import React from "react";
import { View } from "react-native";
import StatCard from "./StatCard";
import { cardStyles } from "../styles/allStyles";

export default function StatOverview({ total, theme }) {
  return (
    <View style={[cardStyles.statsWrapper, { paddingVertical: 10 }]}>
      <StatCard title="Totalt antal plagg" value={total} theme={theme} />
    </View>
  );
}
