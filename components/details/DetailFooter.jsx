import React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../Button";
import ButtonStyle from "../../styles/ButtonStyle";
import { DetailStyle } from "../../styles/pages/DetailStyle";

export default function DetailFooter({
  item,
  theme,
  onGoBack,
  onEdit,
  onDelete
}) {
  return (
    <>
      <View style={DetailStyle.centeredContainer}>
        <Text style={[DetailStyle.sectionTitle, { color: theme.text }]}>
          Tillagd:
        </Text>
        <Text style={{ color: theme.text }}>
          {new Date(item.createdAt).toLocaleDateString("sv-SE")}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onGoBack}
        style={[
          ButtonStyle.backButton,
          { backgroundColor: theme.buttonBackground }
        ]}>
        <MaterialIcons name="arrow-back" size={24} color="white" />
        <Text style={ButtonStyle.backButton}>Gå tillbaka</Text>
      </TouchableOpacity>

      <Button
        title="Redigera"
        onPress={onEdit}
        theme={theme}
        icon={<MaterialIcons name="edit" size={20} color={theme.buttonText} />}
      />

      <Button
        title="Ta bort"
        onPress={onDelete}
        theme={{
          ...theme,
          buttonBackground: "#C62828",
          buttonText: "#fff"
        }}
        icon={<MaterialIcons name="delete" size={20} color="#fff" />}
      />
    </>
  );
}
