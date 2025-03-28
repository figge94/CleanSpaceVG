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
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { formatDate } from "../utils/dateUtils";

import { globalStyles } from "../styles/styles";
import useEditClothingItem from "../hooks/useEditClothingItem";
import { theme } from "../styles/styles";

export default function EditModal({ visible, onClose, item }) {
  const {
    name,
    category,
    condition,
    lastUsed,
    notes,
    tags,
    setName,
    setCategory,
    setCondition,
    setNotes,
    setLastUsed,
    showDatePicker,
    setShowDatePicker,
    onChangeDate,
    setTags,
    handleSave
  } = useEditClothingItem(item, onClose);

  return (
    <Modal
      animationType="fade"
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
              <Text
                style={[
                  globalStyles.title,
                  { color: theme.text, marginBottom: 10 }
                ]}>
                Redigera: {item.name}
              </Text>

              {/* Namn */}
              <TextInput
                style={[
                  globalStyles.input,
                  {
                    borderColor: theme.borderColor,
                    color: theme.text,
                    backgroundColor: theme.cardBackground
                  }
                ]}
                placeholder="Namn"
                placeholderTextColor={theme.text}
                value={name}
                onChangeText={setName}
              />

              {/* Kategori + Underkategori */}
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TextInput
                  style={[
                    globalStyles.input,
                    {
                      flex: 1,
                      borderColor: theme.borderColor,
                      color: theme.text,
                      backgroundColor: theme.cardBackground
                    }
                  ]}
                  placeholder="Kategori"
                  placeholderTextColor={theme.text}
                  value={category.main}
                  onChangeText={(text) =>
                    setCategory((prev) => ({ ...prev, main: text }))
                  }
                />
                <TextInput
                  style={[
                    globalStyles.input,
                    {
                      flex: 1,
                      borderColor: theme.borderColor,
                      color: theme.text,
                      backgroundColor: theme.cardBackground
                    }
                  ]}
                  placeholder="Underkategori"
                  placeholderTextColor={theme.text}
                  value={category.sub}
                  onChangeText={(text) =>
                    setCategory((prev) => ({ ...prev, sub: text }))
                  }
                />
              </View>

              {/* Skick */}
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

              {/* Anteckningar */}
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

              <Text
                style={[
                  globalStyles.addModal.formSection,
                  { color: theme.text }
                ]}>
                Taggar
              </Text>
              <TextInput
                style={[
                  globalStyles.input,
                  {
                    borderColor: theme.borderColor,
                    color: theme.text,
                    backgroundColor: theme.cardBackground,
                    marginBottom: 12
                  }
                ]}
                placeholder="T.ex. sommar, vardag, fest"
                placeholderTextColor={theme.text}
                value={tags}
                onChangeText={setTags}
              />

              {/* Datumfält */}
              <Text
                style={[
                  globalStyles.addModal.formSection,
                  { color: theme.text }
                ]}>
                Senast använd
              </Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{
                  backgroundColor: theme.buttonBackground,
                  paddingVertical: 12,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                  alignItems: "center",
                  marginBottom: 10
                }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons
                    name="calendar-today"
                    size={20}
                    color={theme.buttonText}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={{ color: theme.buttonText, fontSize: 16 }}>
                    {formatDate(lastUsed)}
                  </Text>
                </View>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={lastUsed || new Date()}
                  mode="date"
                  display="spinner"
                  onChange={onChangeDate}
                />
              )}

              {/* Knappar */}
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
