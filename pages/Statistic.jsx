import { useEffect, useState, useContext, useMemo } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { SettingsContext } from "../context/SettingsContext"; // Hanterar ljust/mörkt tema
import { StatisticStyle } from "../styles/pages/StatisticStyle";
import { CardStyle } from "../styles/CardStyle";
import { GlobalStyle } from "../styles/global/GlobalStyle";

// StatCard - återanvändbar komponent som visar ett statistikvärde med titel
const StatCard = ({ title, value, theme }) => (
  <View
    style={[
      StatisticStyle.card,
      {
        backgroundColor: theme.cardBackground, // Färgsättning baserad på valt tema
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3 // Skugga för visuell effekt
      }
    ]}>
    <Text
      style={[
        StatisticStyle.statTitle,
        { color: theme.text, fontWeight: "bold", fontSize: 16 }
      ]}>
      {title}
    </Text>
    <Text
      style={[
        StatisticStyle.statValue,
        { color: theme.text, fontSize: 18, fontWeight: "bold" }
      ]}>
      {value}
    </Text>
  </View>
);

// Statistik-sidan visar data från API:t i olika summeringar och kategorier
export default function StatisticsScreen() {
  const { theme } = useContext(SettingsContext);

  // Tillstånd för API-data, laddning och fel
  const [data, setData] = useState([]);
  const [clearedClothes, setClearedClothes] = useState([]); // (Ej i bruk i denna version)
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect körs när komponenten mountas – hämtar data från API:t
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);

        const itemsResponse = await fetch(
          "https://mitt-api.findersson.se/items"
        );
        if (!itemsResponse.ok) throw new Error("Kunde inte hämta data");

        const itemsData = await itemsResponse.json();
        setData(itemsData || []);
      } catch (error) {
        console.error(error);
        setError(error.message); // Spara felmeddelande
      } finally {
        setLoading(false); // Avsluta laddningsindikator
      }
    };

    fetchData();
  }, []);

  // Memoiserad statistik som bara räknas ut när datan ändras
  const stats = useMemo(() => {
    return {
      totalItems: data.length, // Totalt antal plagg
      categoryCount: data.reduce((acc, item) => {
        const category = item.category?.main || "Okänd";
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {}) // Antal plagg per kategori
    };
  }, [data]);

  return (
    <View
      style={[GlobalStyle.container, { backgroundColor: theme.background }]}>
      <Text style={[GlobalStyle.title, { color: theme.text }]}>Statistik</Text>

      {/* Laddningsindikator, felmeddelande eller innehåll beroende på status */}
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.text} />
      ) : error ? (
        <Text style={[StatisticStyle.errorText, { color: theme.text }]}>
          {error}
        </Text>
      ) : (
        <>
          {/* Sektion: Visar totalantal */}
          <View style={[CardStyle.statsWrapper, { paddingVertical: 10 }]}>
            <StatCard
              title="Totalt antal plagg"
              value={stats.totalItems}
              theme={theme}
            />
          </View>

          {/* Sektion: Visar antal plagg per kategori */}
          <Text
            style={[
              GlobalStyle.subTitle,
              { color: theme.text, marginTop: 10 }
            ]}>
            Antal kläder per kategori:
          </Text>

          <FlatList
            data={Object.entries(stats.categoryCount)} // Omvandlar objekt till lista
            keyExtractor={(item) => item[0]} // Använder kategori-namn som nyckel
            numColumns={2} // Visar två kort per rad
            columnWrapperStyle={{ justifyContent: "space-between", padding: 2 }}
            renderItem={({ item }) => (
              <StatCard title={item[0]} value={`${item[1]} st`} theme={theme} />
            )}
          />
        </>
      )}
    </View>
  );
}
