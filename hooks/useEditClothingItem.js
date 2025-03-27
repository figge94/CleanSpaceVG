import { useState } from "react";
import { Alert } from "react-native";
import { useClothes } from "../data/apiData";

export default function useEditClothingItem(item, onClose) {
  const { updateItem, refetch } = useClothes();

  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category?.main || "");
  const [condition, setCondition] = useState(item.condition || "");
  const [notes, setNotes] = useState(item.notes || "");

  const handleSave = async () => {
    if (!name || !category) {
      Alert.alert("Fel", "Namn och kategori är obligatoriska fält.");
      return;
    }

    const updatedItem = {
      ...item,
      name,
      category: { main: category },
      condition,
      notes
    };

    await updateItem(item._id, updatedItem);
    await refetch();
    Alert.alert("Uppdaterat!", "Plagget har sparats.");
    onClose();
  };

  return {
    name,
    category,
    condition,
    notes,
    setName,
    setCategory,
    setCondition,
    setNotes,
    handleSave
  };
}
