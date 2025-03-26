import React from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { tipsStyles } from "../styles/styles";

// Aktivera animation på Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TipsList({
  tips,
  theme,
  expandedTipId,
  setExpandedTipId
}) {
  const renderItem = ({ item }) => {
    const isExpanded = expandedTipId === item.id;

    const toggleExpand = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpandedTipId(isExpanded ? null : item.id);
    };

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleExpand}
        style={[
          tipsStyles.tipCard,
          isExpanded && tipsStyles.tipCardExpanded,
          {
            backgroundColor: theme.cardBackground,
            borderColor: theme.borderColor
          }
        ]}>
        <View style={tipsStyles.tipHeader}>
          <Text style={[tipsStyles.tipTitle, { color: theme.text }]}>
            {item.title}
          </Text>
          <MaterialIcons
            name={isExpanded ? "expand-less" : "expand-more"}
            size={24}
            color={theme.text}
          />
        </View>
        {isExpanded && (
          <Text style={[tipsStyles.tipText, { color: theme.text }]}>
            {item.text}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={tips}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={tipsStyles.content}
      ListFooterComponent={<View style={{ height: 20 }} />}
    />
  );
}
