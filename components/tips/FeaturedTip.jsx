import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TipsStyle } from "../../styles/pages/TipsStyle";

export default function FeaturedTip({ tip, theme, fadeAnim, onRefresh }) {
  if (!tip) return null;

  return (
    <Animated.View
      style={[
        TipsStyle.featuredTip,
        { backgroundColor: theme.cardBackground, opacity: fadeAnim }
      ]}>
      <View>
        <Text style={[TipsStyle.featuredTipTitle, { color: theme.text }]}>
          {tip.title}
        </Text>
        <Text style={[TipsStyle.featuredTipText, { color: theme.text }]}>
          {tip.text}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onRefresh}
        style={[
          TipsStyle.shuffleButton,
          { backgroundColor: theme.buttonBackground }
        ]}>
        <MaterialIcons name="refresh" size={22} color={theme.buttonText} />
        <Text
          style={[TipsStyle.shuffleButtonText, { color: theme.buttonText }]}>
          Nytt tips
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
