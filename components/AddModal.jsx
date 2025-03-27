import React from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";

import { globalStyles } from "../styles/styles";
import { Button } from "../components";
import useAddClothingItem from "../hooks/useAddClothingItem";
import { formatDate } from "../utils/dateUtils";

export default function AddModal({ visible, onClose }) {
  const {
    name,
    setName,
    category,
    setCategory,
    condition,
    setCondition,
    lastUsed,
    setLastUsed,
    showDatePicker,
    setShowDatePicker,
    onChangeDate,
    tags,
    setTags,
    notes,
    setNotes,
    handleSave
  } = useAddClothingItem(onClose);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}>
        <View style={globalStyles.addModal.backdrop}>
          <View
            style={[
              globalStyles.addModal.container,
              { backgroundColor: theme.cardBackground } // Använd det aktuella kort-temat
            ]}>
            <ScrollView
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}>
              <Text style={[globalStyles.title, { color: theme.text }]}>
                Lägg till plagg
              </Text>

              {/* Namn fält */}
              <Text
                style={[
                  globalStyles.addModal.formSection,
                  { color: theme.text }
                ]}>
                Namn
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
                placeholder="T.ex. svart tröja"
                placeholderTextColor={theme.text}
                value={name}
                onChangeText={setName}
              />

              {/* Kategori fält */}
              <Text
                style={[
                  globalStyles.addModal.formSection,
                  { color: theme.text }
                ]}>
                Kategori
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
                placeholder="T.ex. ytterplagg"
                placeholderTextColor={theme.text}
                value={category}
                onChangeText={setCategory}
              />

              {/* Skick fält */}
              <Text
                style={[
                  globalStyles.addModal.formSection,
                  { color: theme.text }
                ]}>
                Skick
              </Text>
              <View style={globalStyles.addModal.conditionRow}>
                {["Bra", "Sådär", "Dålig"].map((value) => (
                  <TouchableOpacity
                    key={value}
                    onPress={() => setCondition(value)}
                    style={[
                      globalStyles.addModal.conditionButton,
                      {
                        backgroundColor:
                          condition === value
                            ? theme.buttonBackground
                            : theme.cardBackground,
                        borderColor: theme.borderColor
                      }
                    ]}>
                    <Text
                      style={{
                        color: condition === value ? "#fff" : theme.text,
                        fontWeight: "bold"
                      }}>
                      {value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Datum väljare */}
              <Text
                style={[
                  globalStyles.addModal.formSection,
                  { color: theme.text }
                ]}>
                Senast använd
              </Text>
              <Button
                title={formatDate(lastUsed)}
                onPress={() => setShowDatePicker(true)}
                icon={
                  <MaterialIcons
                    name="calendar-today"
                    size={20}
                    color={theme.buttonText}
                  />
                }
                style={{
                  backgroundColor: theme.buttonBackground,
                  width: "100%",
                  borderRadius: 8,
                  paddingVertical: 12
                }}
              />

              {showDatePicker && (
                <DateTimePicker
                  value={lastUsed || new Date()}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                />
              )}

              {/* Taggar fält */}
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
                    backgroundColor: theme.cardBackground
                  }
                ]}
                placeholder="T.ex. vardag, sommar"
                placeholderTextColor={theme.text}
                value={tags}
                onChangeText={setTags}
              />

              {/* Anteckningar fält */}
              <Text
                style={[
                  globalStyles.addModal.formSection,
                  { color: theme.text }
                ]}>
                Anteckningar
              </Text>
              <TextInput
                style={[
                  globalStyles.input,
                  globalStyles.addModal.noteInput,
                  {
                    borderColor: theme.borderColor,
                    color: theme.text,
                    backgroundColor: theme.cardBackground
                  }
                ]}
                placeholder="T.ex. fått av mamma"
                placeholderTextColor={theme.text}
                value={notes}
                onChangeText={setNotes}
                multiline
              />

              {/* Button för att spara */}
              <View style={globalStyles.addModal.buttonGroup}>
                <Button
                  title="Lägg till"
                  onPress={handleSave}
                  style={{ width: "100%" }}
                />
                <Button
                  title="Avbryt"
                  onPress={onClose}
                  style={{ backgroundColor: "#cc0000", width: "100%" }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
