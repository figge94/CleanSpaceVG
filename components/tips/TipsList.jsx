import React from "react";
import { FlatList, View } from "react-native";
import TipItem from "./TipItem";
import { TipsStyle } from "../../styles/pages/TipsStyle";

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
      contentContainerStyle={TipsStyle.content}
      ListFooterComponent={<View style={{ height: 20 }} />}
    />
  );
}
