import React from "react";
import { Modal, Text, View } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import EditClothesForm from "../EditClothesForm";

export default function EditClothesModal({ visible, onClose, item, theme }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <View
          style={{
            width: "90%",
            backgroundColor: theme.cardBackground,
            padding: 20,
            borderRadius: 10
          }}>
          <Text style={[globalStyles.title, { color: theme.text }]}>
            Redigera plagg
          </Text>
          <EditClothesForm item={item} onClose={onClose} />
        </View>
      </View>
    </Modal>
  );
}
