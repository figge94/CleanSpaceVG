import React, { useState, useContext, useEffect } from "react";
import { Text, View, TouchableOpacity, Animated, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SettingsContext } from "../context/SettingsContext";
import { buttonStyles, globalStyles, tipsStyles } from "../styles/styles";
import allTips from "../data/TipsData";
import { TipsList } from "../components";

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

      {randomTip && (
        <Animated.View
          style={[
            tipsStyles.featuredTip,
            { backgroundColor: theme.cardBackground, opacity: fadeAnim }
          ]}>
          <View>
            <Text style={[tipsStyles.featuredTipTitle, { color: theme.text }]}>
              {randomTip.title}
            </Text>
            <Text style={[tipsStyles.featuredTipText, { color: theme.text }]}>
              {randomTip.text}
            </Text>
          </View>

          <TouchableOpacity
            onPress={getRandomTip}
            style={[
              tipsStyles.shuffleButton,
              { backgroundColor: theme.buttonBackground }
            ]}>
            <MaterialIcons name="refresh" size={22} color={theme.buttonText} />
            <Text
              style={[
                tipsStyles.shuffleButtonText,
                { color: theme.buttonText }
              ]}>
              Nytt tips
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}

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
          <FlatList
            data={categories}
            horizontal
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tipsStyles.categoryScroll}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedCategory(item)}
                style={[
                  tipsStyles.categoryButton,
                  {
                    backgroundColor:
                      selectedCategory === item
                        ? theme.activeButtonBackground
                        : theme.notActiveButtonBackground
                  }
                ]}>
                <Text
                  style={[
                    tipsStyles.categoryButtonText,
                    { color: theme.buttonText }
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
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
