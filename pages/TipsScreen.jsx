import React, { useState } from "react";
import { Text, View, TouchableOpacity, Animated, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import useSettings from "../hooks/useSettings";
import { buttonStyles, globalStyles, tipsStyles } from "../styles/styles";
import { TipsList } from "../components";
import useRandomTip from "../hooks/useRandomTip";
import useTipFilter from "../hooks/useTipFilter";

export default function TipsScreen() {
  const { theme } = useSettings();
  const [expandedTipId, setExpandedTipId] = useState(null);
  const { randomTip, fadeAnim, getRandomTip } = useRandomTip();
  const {
    showTips,
    toggleTips,
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredTips
  } = useTipFilter();

  return (
    <View
      style={[globalStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[globalStyles.title, { color: theme.text }]}>Tips</Text>

      {randomTip && (
        <Animated.View
          style={[
            globalStyles.featuredTip,
            { backgroundColor: theme.cardBackground, opacity: fadeAnim }
          ]}>
          <View>
            <Text
              style={[globalStyles.featuredTipTitle, { color: theme.text }]}>
              {randomTip.title}
            </Text>
            <Text style={[globalStyles.featuredTipText, { color: theme.text }]}>
              {randomTip.text}
            </Text>
          </View>

          <TouchableOpacity
            onPress={getRandomTip}
            style={[
              globalStyles.shuffleButton,
              { backgroundColor: theme.buttonBackground }
            ]}>
            <MaterialIcons name="refresh" size={22} color={theme.buttonText} />
            <Text
              style={[
                globalStyles.shuffleButtonText,
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
        onPress={toggleTips}>
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
