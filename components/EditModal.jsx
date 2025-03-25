import React from "react";
import { Modal, Text, View } from "react-native";
import { globalStyles } from "../styles/allStyles";
import { EditForm } from "../components";

export default function EditModal({ visible, onClose, item, theme }) {
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
          <EditForm item={item} onClose={onClose} />
        </View>
      </View>
    </Modal>
  );
}
