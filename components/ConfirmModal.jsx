import React from "react";
import { Modal, View, Text, TouchableOpacity, Pressable } from "react-native";
import { globalStyles, theme } from "../styles/styles";

export default function ConfirmModal({
  visible,
  message,
  onConfirm,
  onCancel
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}>
      <View style={globalStyles.modalBackdrop}>
        <View
          style={[
            globalStyles.modalContainer,
            { backgroundColor: theme.cardBackground, padding: 20 }
          ]}>
          <Text
            style={[
              globalStyles.title,
              { color: theme.text, marginBottom: 10 }
            ]}>
            Bekräfta
          </Text>
          <Text style={{ color: theme.text, marginBottom: 30, fontSize: 16 }}>
            {message}
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Pressable
              onPress={onCancel}
              style={[
                globalStyles.button,
                {
                  backgroundColor: "#ccc",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 8
                }
              ]}>
              <Text style={{ color: "#000", fontWeight: "bold" }}>Avbryt</Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              style={[
                globalStyles.button,
                {
                  backgroundColor: "#C62828",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 8
                }
              ]}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Ta bort</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
