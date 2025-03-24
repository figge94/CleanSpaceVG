import React, { useEffect, useState, useContext, useMemo } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { SettingsContext } from "../context/SettingsContext";
import { GlobalStyle } from "../styles/global/GlobalStyle";
import { StatisticStyle } from "../styles/pages/StatisticStyle";
import { useClothes } from "../data/apiData";

import StatOverview from "../components/statistics/StatOverview";
import StatCategoryList from "../components/statistics/StatCategoryList";

export default function StatisticsScreen() {
  const { theme } = useContext(SettingsContext);
  const { data, isLoading, error } = useClothes();

  const stats = useMemo(() => {
    return {
      totalItems: data.length,
      categoryCount: data.reduce((acc, item) => {
        const cat = item.category?.main || "Okänd";
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
      }, {})
    };
  }, [data]);

  return (
    <View
      style={[GlobalStyle.container, { backgroundColor: theme.background }]}>
      <Text style={[GlobalStyle.title, { color: theme.text }]}>Statistik</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color={theme.text} />
      ) : error ? (
        <Text style={[StatisticStyle.errorText, { color: theme.text }]}>
          {error}
        </Text>
      ) : (
        <>
          <StatOverview total={stats.totalItems} theme={theme} />
          <StatCategoryList categories={stats.categoryCount} theme={theme} />
        </>
      )}
    </View>
  );
}
