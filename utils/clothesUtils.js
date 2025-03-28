import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export function createNewClothingItem({
  name,
  category,
  condition,
  notes,
  lastUsed,
  tags
}) {
  return {
    name,
    category,
    condition,
    notes,
    lastUsed: lastUsed ? new Date(lastUsed) : null,
    tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
    clearedAt: null
  };
}

export async function deleteAndArchiveItem(item, deleteItemFn, onSuccess) {
  try {
    // 1. Spara lokalt
    const archived = await AsyncStorage.getItem("deletedItems");
    const deletedItems = archived ? JSON.parse(archived) : [];

    deletedItems.push({
      _id: item._id,
      name: item.name,
      category: item.category,
      deletedAt: new Date().toISOString()
    });

    await AsyncStorage.setItem("deletedItems", JSON.stringify(deletedItems));

    // 2. Ta bort från API
    await deleteItemFn(item._id);

    Alert.alert("Borttaget", "Plagget har tagits bort och arkiverats.");
    if (onSuccess) onSuccess();
  } catch (err) {
    Alert.alert("Fel", "Kunde inte ta bort plagget.");
    console.error(err);
  }
}
