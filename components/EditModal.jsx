import React, { useState, useContext } from "react";
import {
  Modal,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
} from "react-native";
import { SettingsContext } from "../context/SettingsContext";
import { useClothes } from "../data/apiData";
import { globalStyles } from "../styles/styles";

export default function EditModal({ visible, onClose, item, theme }) {
  const { updateItem, refetch } = useClothes();
  const { theme: contextTheme } = useContext(SettingsContext);

  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category?.main || "");
  const [condition, setCondition] = useState(item.condition || "");
  const [notes, setNotes] = useState(item.notes || "");
  const [isSaving, setIsSaving] = useState(false); // Hantera sparande

  const handleSave = async () => {
    if (!name || !category) {
      Alert.alert("Fel", "Namn och kategori är obligatoriska fält.");
      return;
    }

    setIsSaving(true); // Starta sparandeprocess

    const updatedItem = {
      ...item,
      name,
      category: { main: category },
      condition,
      notes
    };

    try {
      await updateItem(item._id, updatedItem);
      await refetch();
      Alert.alert("Uppdaterat!", "Plagget har sparats.");
      onClose();
    } catch (error) {
      Alert.alert("Fel", "Det gick inte att spara ändringarna.");
    } finally {
      setIsSaving(false); // Slutför sparandeprocess
    }
  };

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
              width: "100%",
              maxHeight: "100%",
              backgroundColor: theme.cardBackground,
              padding: 30,
              borderRadius: 10
            }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <Text style={[globalStyles.title, { color: theme.text }]}>
                Redigera detaljer för {item.name}
              </Text>

              {/* Inputfält */}
              <TextInput
                style={globalStyles.input}
                placeholder="Namn på plagget"
                placeholderTextColor={theme.text}
                value={name}
                onChangeText={setName}
              />

              <TextInput
                style={globalStyles.input}
                placeholder="Kategori"
                placeholderTextColor={theme.text}
                value={category}
                onChangeText={setCategory}
              />

              <TextInput
                style={globalStyles.input}
                placeholder="Skick"
                placeholderTextColor={theme.text}
                value={condition}
                onChangeText={setCondition}
              />

              <TextInput
                style={[globalStyles.input, { height: 80 }]}
                placeholder="Anteckningar"
                placeholderTextColor={theme.text}
                value={notes}
                onChangeText={setNotes}
                multiline
              />

              {/* Spara och Avbryt knappar */}
              <TouchableOpacity
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
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#888",
                  padding: 12,
                  borderRadius: 10,
                  alignItems: "center",
                  marginTop: 10
                }}
                onPress={onClose}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "bold"
                  }}>
                  Avbryt
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
