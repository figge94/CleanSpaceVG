import React from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { globalStyles } from "../styles/allStyles";
import { AddForm } from "../components";

export default function AddModal({ visible, onClose, theme }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end"
          }}>
          <View
            style={{
              maxHeight: "90%",
              backgroundColor: theme.cardBackground,
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20
            }}>
            <ScrollView
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}>
              <Text style={[globalStyles.title, { color: theme.text }]}>
                Lägg till plagg
              </Text>
              <AddForm onClose={onClose} theme={theme} />
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
