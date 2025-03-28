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
import { theme } from "../styles/styles";

export default function AddModal({ visible, onClose }) {
  const {
    name,
    setName,
    category,
    setCategory,
    condition,
    setCondition,
    subCategory, // ✅ Lägg till detta
    setSubCategory,
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

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}>
                {/* Kategori */}
                <View style={{ flex: 1, marginRight: 5 }}>
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
                    placeholder="Ytterplagg, överdelar"
                    placeholderTextColor="#BFBFBF"
                    value={category.main}
                    onChangeText={(text) =>
                      setCategory((prev) => ({ ...prev, main: text }))
                    }
                  />
                </View>

                {/* Underkategori */}
                <View style={{ flex: 1, marginLeft: 5 }}>
                  <Text
                    style={[
                      globalStyles.addModal.formSection,
                      { color: theme.text }
                    ]}>
                    Underkategori
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
                    placeholder="T.ex. jacka"
                    placeholderTextColor="#BFBFBF"
                    value={category.sub}
                    onChangeText={(text) =>
                      setCategory((prev) => ({ ...prev, sub: text }))
                    }
                  />
                </View>
              </View>

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
                          condition === value ? "#B28C7C" : "#EEE6E2",
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
                  width: "60%",
                  borderRadius: 25,
                  paddingVertical: 12
                }}
              />

              {showDatePicker && (
                <DateTimePicker
                  value={lastUsed || new Date()}
                  mode="date"
                  display="spinner"
                  design="material"
                  fullscreen={true}
                  negativeButton={{ label: "Cancel", textColor: "red" }}
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
