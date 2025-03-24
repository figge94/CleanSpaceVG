import React from "react";
import { View } from "react-native";
import StatCard from "./StatCard";
import { CardStyle } from "../../styles/CardStyle";

export default function StatOverview({ total, theme }) {
  return (
    <View style={[CardStyle.statsWrapper, { paddingVertical: 10 }]}>
      <StatCard title="Totalt antal plagg" value={total} theme={theme} />
    </View>
  );
}
