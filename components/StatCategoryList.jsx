import React from "react";
import { Text, FlatList, View } from "react-native";
import { globalStyles } from "../styles/allStyles";
import { StatCard } from "../components";

export default function StatCategoryList({ categories, theme }) {
  return (
    <>
      <Text
        style={[globalStyles.subTitle, { color: theme.text, marginTop: 10 }]}>
        Antal kläder per kategori:
      </Text>

      <FlatList
        data={Object.entries(categories)}
        keyExtractor={(item) => item[0]}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", padding: 2 }}
        renderItem={({ item }) => (
          <StatCard title={item[0]} value={`${item[1]} st`} theme={theme} />
        )}
      />
    </>
  );
}
