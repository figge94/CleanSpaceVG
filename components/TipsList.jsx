import React from "react";
import { FlatList, View } from "react-native";
import TipItem from "./TipItem";
import { tipsStyles } from "../styles/screensStyles";

export default function TipsList({
  tips,
  theme,
  expandedTipId,
  setExpandedTipId
}) {
  return (
    <FlatList
      data={tips}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TipItem
          item={item}
          theme={theme}
          expandedTipId={expandedTipId}
          setExpandedTipId={setExpandedTipId}
        />
      )}
      contentContainerStyle={tipsStyles.content}
      ListFooterComponent={<View style={{ height: 20 }} />}
    />
  );
}
