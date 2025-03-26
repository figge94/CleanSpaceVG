import React from "react";
import {
  Modal,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { globalStyles } from "../styles/allStyles";
import { EditForm } from "../components";

export default function EditModal({ visible, onClose, item, theme }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
              maxHeight: "80%",
              backgroundColor: theme.cardBackground,
              padding: 20,
              borderRadius: 10
            }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <Text style={[globalStyles.title, { color: theme.text }]}>
                Redigera plagg
              </Text>

              <EditForm item={item} onClose={onClose} theme={theme} />
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
