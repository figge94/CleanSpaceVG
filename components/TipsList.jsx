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
import { globalStyles } from "../styles/styles";

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
          globalStyles.tipCard,
          isExpanded && globalStyles.tipCardExpanded,
          {
            backgroundColor: theme.cardBackground,
            borderColor: theme.borderColor
          }
        ]}>
        <View style={globalStyles.tipHeader}>
          <Text style={[globalStyles.tipTitle, { color: theme.text }]}>
            {item.title}
          </Text>
          <MaterialIcons
            name={isExpanded ? "expand-less" : "expand-more"}
            size={24}
            color={theme.text}
          />
        </View>
        {isExpanded && (
          <Text style={[globalStyles.tipText, { color: theme.text }]}>
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
      contentContainerStyle={globalStyles.content}
      ListFooterComponent={<View style={{ height: 20 }} />}
    />
  );
}
