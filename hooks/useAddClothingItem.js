import { useState } from "react";
import { Alert, Platform } from "react-native";
import { useClothes } from "../data/apiData";
import { createNewClothingItem } from "../utils/clothesUtils";

export default function useAddClothingItem(onClose) {
  const { createItem, refetch } = useClothes();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [lastUsed, setLastUsed] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) setLastUsed(selectedDate);
  };

  const handleSave = async () => {
    if (!name || !category) {
      Alert.alert("Fel", "Namn och kategori är obligatoriska fält.");
      return;
    }

    const newItem = createNewClothingItem({
      name,
      category,
      condition,
      notes,
      lastUsed,
      tags
    });

    await createItem(newItem);
    await refetch();
    Alert.alert("Lyckades!", "Plagget har lagts till.");
    onClose();
  };

  return {
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
  };
}
