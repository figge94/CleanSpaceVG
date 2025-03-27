import React from "react";
import {
  Modal,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import useAppTheme from "../hooks/useAppTheme";
import { globalStyles } from "../styles/styles";
import useEditClothingItem from "../hooks/useEditClothingItem";

export default function EditModal({ visible, onClose, item }) {
  const { theme } = useAppTheme(); // Använd useAppTheme för att hämta temat
  const {
    name,
    category,
    condition,
    notes,
    setName,
    setCategory,
    setCondition,
    setNotes,
    handleSave
  } = useEditClothingItem(item, onClose);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={globalStyles.editModal.backdrop}>
          <View
            style={[
              globalStyles.editModal.container,
              { backgroundColor: theme.cardBackground }
            ]}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <Text style={[globalStyles.title, { color: theme.text }]}>
                Redigera plagg
              </Text>

              <TextInput
                style={[
                  globalStyles.input,
                  {
                    borderColor: theme.borderColor,
                    color: theme.text,
                    backgroundColor: theme.cardBackground
                  }
                ]}
                placeholder="Namn på plagget"
                placeholderTextColor={theme.text}
                value={name}
                onChangeText={setName}
              />

              <TextInput
                style={[
                  globalStyles.input,
                  {
                    borderColor: theme.borderColor,
                    color: theme.text,
                    backgroundColor: theme.cardBackground
                  }
                ]}
                placeholder="Kategori"
                placeholderTextColor={theme.text}
                value={category}
                onChangeText={setCategory}
              />

              <TextInput
                style={[
                  globalStyles.input,
                  {
                    borderColor: theme.borderColor,
                    color: theme.text,
                    backgroundColor: theme.cardBackground
                  }
                ]}
                placeholder="Skick"
                placeholderTextColor={theme.text}
                value={condition}
                onChangeText={setCondition}
              />

              <TextInput
                style={[
                  globalStyles.input,
                  globalStyles.editModal.noteInput,
                  {
                    borderColor: theme.borderColor,
                    color: theme.text,
                    backgroundColor: theme.cardBackground
                  }
                ]}
                placeholder="Anteckningar"
                placeholderTextColor={theme.text}
                value={notes}
                onChangeText={setNotes}
                multiline
              />

              <TouchableOpacity
                style={[
                  globalStyles.editModal.button,
                  { backgroundColor: theme.buttonBackground }
                ]}
                onPress={handleSave}>
                <Text
                  style={[
                    globalStyles.editModal.saveText,
                    { color: theme.buttonText }
                  ]}>
                  Spara ändringar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  globalStyles.editModal.button,
                  globalStyles.editModal.cancelButton
                ]}
                onPress={onClose}>
                <Text style={globalStyles.editModal.cancelText}>Avbryt</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
