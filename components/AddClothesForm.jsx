import { useState, useContext, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { useClothes } from "../data/apiData"; // Egen hook för att kommunicera med API:t
import { SettingsContext } from "../context/SettingsContext"; // Hanterar färgtema
import { GlobalStyle } from "../styles/global/GlobalStyle";
import Button from "../components/Button"; // Återanvändbar knappkomponent
import DateTimePicker from "@react-native-community/datetimepicker"; // För att välja datum
import { MaterialIcons } from "@expo/vector-icons";

// Komponent som innehåller ett formulär för att lägga till ett nytt plagg
export default function AddClothesForm({ onClose }) {
  const { createItem, refetch } = useClothes(); // Funktioner för att skapa nytt plagg och hämta datan igen
  const { theme } = useContext(SettingsContext); // Hämtar aktuellt färgtema

  // Tillstånd för formulärets fält
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [lastUsed, setLastUsed] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");
  const [barcode, setBarcode] = useState("");

  // Skapar ett unikt ID för varje plagg direkt när komponenten laddas
  useEffect(() => {
    if (!barcode) {
      const newCode = "plagg-" + Date.now();
      setBarcode(newCode);
    }
  }, []);

  // Uppdaterar datum när användaren väljer ett nytt
  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) setLastUsed(selectedDate);
  };

  // Validerar och skickar datan till API:t
  const handleSave = async () => {
    if (!name || !category) {
      Alert.alert("Fel", "Namn och kategori är obligatoriska fält.");
      return;
    }

    // Skapar ett nytt objekt att spara
    const newItem = {
      name,
      category: { main: category },
      condition,
      notes,
      barcode,
      lastUsed: lastUsed ? new Date(lastUsed) : null,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      clearedAt: null
    };

    await createItem(newItem); // Skickar POST-anrop till API:t
    await refetch(); // Uppdaterar listan med plagg
    Alert.alert("Lyckades!", "Plagget har lagts till.");
    onClose(); // Stänger formuläret
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView>
        {/* Rubrik för formuläret */}
        <Text style={[GlobalStyle.subTitle, { color: theme.text }]}>
          Plagginformation
        </Text>

        {/* Fält för namn på plagget */}
        <Text style={{ color: theme.text, marginTop: 5 }}>Namn</Text>
        <TextInput
          style={GlobalStyle.input}
          placeholder="T.ex. svart tröja"
          placeholderTextColor={GlobalStyle.text}
          value={name}
          onChangeText={setName}
        />

        {/* Fält för kategori */}
        <Text style={{ color: theme.text, marginTop: 5 }}>Kategori</Text>
        <TextInput
          style={GlobalStyle.input}
          placeholder="T.ex. ytterplagg"
          placeholderTextColor={GlobalStyle.text}
          value={category}
          onChangeText={setCategory}
        />

        {/* Fält för skick – presenteras som tre knappar */}
        <Text style={{ color: theme.text, marginTop: 5 }}>Skick</Text>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          {["Bra", "Sådär", "Dålig"].map((value) => (
            <TouchableOpacity
              key={value}
              onPress={() => setCondition(value)}
              style={{
                backgroundColor:
                  condition === value
                    ? theme.buttonBackground
                    : theme.cardBackground,
                borderColor: theme.borderColor,
                borderWidth: 1,
                borderRadius: 20,
                paddingVertical: 8,
                paddingHorizontal: 16,
                marginRight: 10
              }}>
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

        {/* Fält för att välja senaste användningsdatum */}
        <Text
          style={{
            color: theme.text,
            fontSize: 16,
            fontWeight: "bold"
          }}>
          Senast använd
        </Text>
        <Button
          title={
            lastUsed
              ? new Date(lastUsed).toLocaleDateString("sv-SE")
              : "Välj datum"
          }
          onPress={() => setShowDatePicker(true)}
          theme={theme}
          icon={
            <MaterialIcons
              name="calendar-today"
              size={20}
              color={theme.buttonText}
            />
          }
          style={{
            backgroundColor: "#6D4F40",
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

        {/* Fält för taggar – skrivs in som kommaseparerad text */}
        <Text style={{ color: theme.text, marginTop: 5 }}>Taggar</Text>
        <TextInput
          style={GlobalStyle.input}
          placeholder="T.ex. vardag, sommar"
          placeholderTextColor={GlobalStyle.text}
          value={tags}
          onChangeText={setTags}
        />

        {/* Fält för valfria anteckningar */}
        <Text style={{ color: theme.text, marginTop: 5 }}>Anteckningar</Text>
        <TextInput
          style={[GlobalStyle.input, { height: 70 }]}
          placeholder="T.ex. Fått av mamma"
          placeholderTextColor={GlobalStyle.text}
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        {/* Knappar för att lägga till eller avbryta */}
        <View>
          <Button
            title="Lägg till"
            onPress={handleSave}
            theme={theme}
            style={{ width: "100%" }}
          />
          <Button
            title="Avbryt"
            onPress={onClose}
            theme={theme}
            style={{ backgroundColor: "#cc0000", width: "100%" }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
