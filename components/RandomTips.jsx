import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { tipsStyles } from "../styles/screensStyles";

export default function getRandomTips({ tip, theme, fadeAnim, onRefresh }) {
  if (!tip) return null;

  return (
    <Animated.View
      style={[
        tipsStyles.featuredTip,
        { backgroundColor: theme.cardBackground, opacity: fadeAnim }
      ]}>
      <View>
        <Text style={[tipsStyles.featuredTipTitle, { color: theme.text }]}>
          {tip.title}
        </Text>
        <Text style={[tipsStyles.featuredTipText, { color: theme.text }]}>
          {tip.text}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onRefresh}
        style={[
          tipsStyles.shuffleButton,
          { backgroundColor: theme.buttonBackground }
        ]}>
        <MaterialIcons name="refresh" size={22} color={theme.buttonText} />
        <Text
          style={[tipsStyles.shuffleButtonText, { color: theme.buttonText }]}>
          Nytt tips
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
