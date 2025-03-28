import { useState } from "react";
import { Alert, Platform } from "react-native";
import { useClothes } from "../data/apiData";

export default function useEditClothingItem(item, onClose) {
  const { updateItem, refetch } = useClothes();

  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState({
    main: item.category?.main || "",
    sub: item.category?.sub || ""
  });
  const [condition, setCondition] = useState(item.condition || "");
  const [notes, setNotes] = useState(item.notes || "");
  const [lastUsed, setLastUsed] = useState(
    item.lastUsed ? new Date(item.lastUsed) : null
  );
  const [tags, setTags] = useState(
    item.tags && Array.isArray(item.tags) ? item.tags.join(", ") : ""
  );

  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS !== "ios") setShowDatePicker(false);
    if (selectedDate) setLastUsed(selectedDate);
  };

  const handleSave = async () => {
    if (!name || !category.main) {
      Alert.alert("Fel", "Namn och kategori är obligatoriska fält.");
      return;
    }

    const updatedItem = {
      ...item,
      name,
      category,
      condition,
      notes,
      lastUsed,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : []
    };

    try {
      await updateItem(item._id, updatedItem);
      await refetch();
      Alert.alert("Uppdaterat!", "Plagget har sparats.");
      onClose();
    } catch (err) {
      Alert.alert("Fel", "Det gick inte att spara ändringar.");
      console.error(err);
    }
  };

  return {
    name,
    category,
    condition,
    notes,
    lastUsed,
    showDatePicker,
    setName,
    setCategory,
    setCondition,
    setNotes,
    setLastUsed,
    setShowDatePicker,
    onChangeDate,
    handleSave
  };
}
