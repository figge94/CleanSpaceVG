import React from "react";
import { Modal, View, Text } from "react-native";
import { GlobalStyle } from "../../styles/global/GlobalStyle";
import AddClothesForm from "./AddClothesForm";

export default function AddClothesModal({ visible, onClose, theme }) {
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
          <Text style={[GlobalStyle.title, { color: theme.text }]}>
            Lägg till plagg
          </Text>
          <AddClothesForm onClose={onClose} />
        </View>
      </View>
    </Modal>
  );
}
