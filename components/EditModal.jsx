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

import { globalStyles } from "../styles/styles";
import useEditClothingItem from "../hooks/useEditClothingItem";

export default function EditModal({ visible, onClose, item }) {
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
                Redigera detaljer för {item.name}
              </Text>

              {/* Inputfält */}
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

              {/* Spara och Avbryt knappar */}
              <TouchableOpacity
<<<<<<< HEAD
                style={{
                  backgroundColor: theme.buttonBackground,
                  padding: 12,
                  borderRadius: 10,
                  alignItems: "center",
                  marginTop: 10
                }}
                onPress={handleSave}
                disabled={isSaving}>
                {isSaving ? (
                  <ActivityIndicator size="small" color={theme.buttonText} />
                ) : (
                  <Text
                    style={{
                      color: theme.buttonText,
                      fontSize: 16,
                      fontWeight: "bold"
                    }}>
                    Spara ändringar
                  </Text>
                )}
=======
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
>>>>>>> 36fed3122b73f1755aaa9e86d6e4ddca332914cc
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
