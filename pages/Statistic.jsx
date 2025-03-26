import React, { useEffect, useState, useContext, useMemo } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SettingsContext } from "../context/SettingsContext";
import { globalStyles, statisticStyles, cardStyles } from "../styles/styles";
import { useClothes } from "../data/apiData";
import { errorText } from "../styles/utilities";

export default function StatisticsScreen() {
  const { theme } = useContext(SettingsContext);
  const { data = [], isLoading, error } = useClothes();

  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const saved = await AsyncStorage.getItem("favorites");
        if (saved) setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Kunde inte ladda favoriter", e);
      }
    };
    loadFavorites();
  }, []);

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

  const categoryEntries = Object.entries(stats.categoryCount);

  if (isLoading) {
    return (
      <View
        style={[globalStyles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[globalStyles.container, { backgroundColor: theme.background }]}>
        <Text style={[errorText, { color: theme.text }]}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={{ padding: 20 }}
      data={categoryEntries}
      keyExtractor={(item) => item[0]}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between", padding: 2 }}
      ListHeaderComponent={
        <>
          <Text style={[globalStyles.title, { color: theme.text }]}>
            Statistik
          </Text>
          <View style={[cardStyles.statsWrapper, { paddingVertical: 10 }]}>
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
                Totalt antal plagg
              </Text>
              <Text style={[statisticStyles.statValue, { color: theme.text }]}>
                {stats.totalItems}
              </Text>
            </View>

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
                Favoritplagg
              </Text>
              <Text style={[statisticStyles.statValue, { color: theme.text }]}>
                {Object.values(favorites).filter(Boolean).length}
              </Text>
            </View>
          </View>

          <Text
            style={[
              globalStyles.subTitle,
              { color: theme.text, marginTop: 10 }
            ]}>
            Antal kläder per kategori:
          </Text>
        </>
      }
      renderItem={({ item }) => (
        <View
          style={[
            statisticStyles.card,
            {
              backgroundColor: theme.cardBackground,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 3,
              marginBottom: 8,
              flex: 1,
              marginHorizontal: 4
            }
          ]}>
          <Text style={[statisticStyles.statTitle, { color: theme.text }]}>
            {item[0]}
          </Text>
          <Text style={[statisticStyles.statValue, { color: theme.text }]}>
            {item[1]} st
          </Text>
        </View>
      )}
    />
  );
}
