import { useState, useContext, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity, Animated } from "react-native";
import { SettingsContext } from "../context/SettingsContext"; // Hanterar ljust/mörk tema
import { GlobalStyle } from "../styles/global/GlobalStyle"; // Global styling
import TipItem from "../components/TipItem"; // Komponent för varje enskilt tips
import { TipsStyle } from "../styles/pages/TipsStyle"; // Stil för sidan
import allTips from "../data/TipsData"; // Lista med alla tips
import { MaterialIcons } from "@expo/vector-icons";
import FeaturedTip from "../components/tips/FeaturedTip";

// Skärm som visar ett slumpmässigt tips - med möjlighet att filtrera och expandera fler tips
export default function TipsScreen({ navigation }) {
  const { theme } = useContext(SettingsContext);
  const [selectedCategory, setSelectedCategory] = useState(null); // Aktuellt vald kategori (för filtrering)
  const [showTips, setShowTips] = useState(false); // Om listan med tips ska visas eller döljas
  const [randomTip, setRandomTip] = useState(null); // Håller ett slumpmässigt tips som visas överst
  const [expandedTipId, setExpandedTipId] = useState(null); // Håller ID för vilket tips som är expanderat (accordion)
  const fadeAnim = useState(new Animated.Value(0))[0]; // Används för att animera in det slumpmässiga tipset

  // Kategorier som användaren kan filtrera efter
  const categories = ["Förvaring", "Organisering", "Tvätt", "Mer utrymme"];

  // Funktion som väljer ett nytt slumpmässigt tips och animerar in det
  const getRandomTip = () => {
    const newTip = allTips[Math.floor(Math.random() * allTips.length)];
    setRandomTip(newTip);
    fadeAnim.setValue(0); // Starta från osynligt
    Animated.timing(fadeAnim, {
      toValue: 1, // Animeras till helt synlig
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  // Välj ett tips direkt när komponenten mountas
  useEffect(() => {
    getRandomTip();
  }, []);

  // Filtrerar tipsen baserat på vald kategori
  const filteredTips = selectedCategory
    ? allTips.filter((tip) => tip.category === selectedCategory)
    : [];

  return (
    <View
      style={[GlobalStyle.container, { backgroundColor: theme.background }]}>
      <Text style={[GlobalStyle.title, { color: theme.text }]}>Tips</Text>

      {/* Visar slumpmässigt tips högst upp */}
      <View style={TipsStyle.featuredTipContainer}>
        <FeaturedTip
          tip={randomTip}
          theme={theme}
          fadeAnim={fadeAnim}
          onRefresh={getRandomTip}
        />
      </View>

      {/* Knapp som visar/döljer listan med fler tips */}
      <TouchableOpacity
        style={[
          TipsStyle.toggleButton,
          { backgroundColor: theme.buttonBackground }
        ]}
        onPress={() => {
          setShowTips(!showTips);
          setSelectedCategory(showTips ? null : "Förvaring"); // Förvalt kategori vid öppning
        }}>
        <Text style={[TipsStyle.toggleButtonText, { color: theme.buttonText }]}>
          {showTips ? "Dölj fler tips" : "Visa fler tips"}
        </Text>
      </TouchableOpacity>

      {/* Kategoriknappar visas om tipslistan är öppen */}
      {showTips && (
        <FlatList
          data={categories}
          horizontal={true}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={TipsStyle.categoryScroll}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                TipsStyle.categoryButton,
                {
                  backgroundColor:
                    selectedCategory === item
                      ? theme.activeButtonBackground
                      : theme.notActiveButtonBackground
                }
              ]}
              onPress={() => setSelectedCategory(item)}>
              <Text
                style={[
                  TipsStyle.categoryButtonText,
                  { color: theme.buttonText }
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Visar tipsen i vald kategori om tipslistan är öppen */}
      {showTips && selectedCategory && (
        <FlatList
          data={filteredTips}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TipItem
              item={item}
              theme={theme}
              expandedTipId={expandedTipId}
              setExpandedTipId={setExpandedTipId} // Möjliggör accordion-funktionalitet
            />
          )}
          contentContainerStyle={TipsStyle.content}
          ListFooterComponent={<View style={{ height: 20 }} />}
        />
      )}
    </View>
  );
}
