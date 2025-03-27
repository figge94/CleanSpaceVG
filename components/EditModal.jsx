import React from "react";
import {
  Modal,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
<<<<<<< HEAD
  Platform,
  Alert,
  ActivityIndicator
=======
  Platform
>>>>>>> 36fed3122b73f1755aaa9e86d6e4ddca332914cc
} from "react-native";

import { globalStyles } from "../styles/styles";
import useEditClothingItem from "../hooks/useEditClothingItem";

<<<<<<< HEAD
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
=======
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
>>>>>>> 36fed3122b73f1755aaa9e86d6e4ddca332914cc

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
