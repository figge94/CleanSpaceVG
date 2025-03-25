import React from "react";
import { Text } from "react-native";
import { globalStyles } from "../../styles/globalStyles";

export default function HomeIntro({ theme }) {
  return (
    <Text style={[globalStyles.description, { color: theme.text }]}>
      <Text style={{ fontWeight: "bold", fontSize: 25 }}>
        Rensa enkelt, organisera smart
      </Text>
      {"\n"}
      <Text style={{ fontSize: 18, opacity: 0.8 }}>
        Få full koll på din garderob snabbt och smidigt.
      </Text>
    </Text>
  );
}
