import { useState, useContext } from "react"; // Importerar React Hook-funktioner
import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native"; // Importerar komponenter från React Native
import { useClothes } from "../data/apiData"; // Egen hook för att hantera API-anrop
import { SettingsContext } from "../context/SettingsContext"; // Kontext för ljust/mörkt tema
import { GlobalStyle } from "../styles/global/GlobalStyle";

// EditClothesForm – Komponent som visar ett formulär för att redigera ett plagg
// Använder en modal för att visa formuläret
// Tar emot ett plagg-objekt och en funktion för att stänga modalen
// Innehåller textfält för namn, kategori, färg, skick och anteckningar
// Samt knappar för att spara ändringar eller avbryta

export default function EditClothesForm({ item, onClose }) {
  const { updateItem, refetch } = useClothes(); // Funktioner för att uppdatera och hämta kläder
  const { theme } = useContext(SettingsContext); // Hämta aktuellt tema

  // Variabler för att hålla reda på värden i formuläret
  const [name, setName] = useState(item.name); // Namn på plagget
  const [category, setCategory] = useState(item.category?.main || ""); // Kategori
  const [condition, setCondition] = useState(item.condition || ""); // Skick
  const [notes, setNotes] = useState(item.notes || ""); // Anteckningar

  // Funktion som körs när användaren trycker på "Spara"-knappen
  const handleSave = async () => {
    // Kontrollerar att namn och kategori är ifyllda innan sparning
    if (!name || !category) {
      Alert.alert("Fel", "Namn och kategori är obligatoriska fält.");
      return;
    }

    // Skapar ett uppdaterat objekt baserat på formulärens värden
    const updatedItem = {
      ...item,
      name,
      category: { main: category },
      condition,
      notes
    };

    // Skickar uppdatering till API:t och hämtar den nya datan
    await updateItem(item._id, updatedItem);
    await refetch(); //  Uppdaterar listan direkt
    Alert.alert("Uppdaterat!", "Plagget har sparats.");
    onClose(); // Stänger modalen
  };

  return (
    <View>
      {/* Fält för namn */}
      <TextInput
        style={GlobalStyle.input}
        placeholder="Namn på plagget"
        placeholderTextColor={theme.text}
        value={name}
        onChangeText={setName}
      />

      {/* Fält för kategori */}
      <TextInput
        style={GlobalStyle.input}
        placeholder="Kategori"
        placeholderTextColor={theme.text}
        value={category}
        onChangeText={setCategory}
      />

      {/* Fält för skick */}
      <TextInput
        style={GlobalStyle.input}
        placeholder="Skick"
        placeholderTextColor={theme.text}
        value={condition}
        onChangeText={setCondition}
      />

      {/* Fält för anteckningar */}
      <TextInput
        style={[GlobalStyle.input, { height: 80 }]}
        placeholder="Anteckningar"
        placeholderTextColor={theme.text}
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      {/* Knapp för att spara ändringar */}
      <TouchableOpacity
        style={{
          backgroundColor: theme.buttonBackground,
          padding: 12,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 10
        }}
        onPress={handleSave}>
        <Text
          style={{ color: theme.buttonText, fontSize: 16, fontWeight: "bold" }}>
          Spara ändringar
        </Text>
      </TouchableOpacity>

      {/* Knapp för att avbryta och stänga formuläret */}
      <TouchableOpacity
        style={{
          backgroundColor: "#888",
          padding: 12,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 10
        }}
        onPress={onClose}>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          Avbryt
        </Text>
      </TouchableOpacity>
    </View>
  );
}
