import React, { useState, useContext, useEffect } from "react";
import { Text, View, TouchableOpacity, Animated } from "react-native";
import { SettingsContext } from "../context/SettingsContext";
import { buttonStyles, globalStyles, tipsStyles } from "../styles/allStyles";
import allTips from "../data/TipsData";

import { FeaturedTip, CategorySelector, TipsList } from "../components";

export default function TipsScreen() {
  const { theme } = useContext(SettingsContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showTips, setShowTips] = useState(false);
  const [randomTip, setRandomTip] = useState(null);
  const [expandedTipId, setExpandedTipId] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const categories = ["Förvaring", "Organisering", "Tvätt", "Mer utrymme"];

  const getRandomTip = () => {
    const newTip = allTips[Math.floor(Math.random() * allTips.length)];
    setRandomTip(newTip);
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  useEffect(() => {
    getRandomTip();
  }, []);

  const filteredTips = selectedCategory
    ? allTips.filter((tip) => tip.category === selectedCategory)
    : [];

  return (
    <View
      style={[globalStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[globalStyles.title, { color: theme.text }]}>Tips</Text>

      <View style={tipsStyles.featuredTipContainer}>
        <FeaturedTip
          tip={randomTip}
          theme={theme}
          fadeAnim={fadeAnim}
          onRefresh={getRandomTip}
        />
      </View>

      <TouchableOpacity
        style={[
          buttonStyles.toggleButton,
          { backgroundColor: theme.buttonBackground }
        ]}
        onPress={() => {
          setShowTips(!showTips);
          setSelectedCategory(showTips ? null : "Förvaring");
        }}>
        <Text
          style={[buttonStyles.toggleButtonText, { color: theme.buttonText }]}>
          {showTips ? "Dölj fler tips" : "Visa fler tips"}
        </Text>
      </TouchableOpacity>

      {showTips && (
        <>
          <CategorySelector
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            theme={theme}
          />
          {selectedCategory && (
            <TipsList
              tips={filteredTips}
              theme={theme}
              expandedTipId={expandedTipId}
              setExpandedTipId={setExpandedTipId}
            />
          )}
        </>
      )}
    </View>
  );
}
