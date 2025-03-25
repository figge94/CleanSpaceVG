import React from "react";
import { Modal, View, Text } from "react-native";
import { globalStyles } from "../styles/allStyles";
import { AddForm } from "../components";

export default function AddModal({ visible, onClose, theme }) {
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
            Lägg till plagg
          </Text>
          <AddForm onClose={onClose} />
        </View>
      </View>
    </Modal>
  );
}
