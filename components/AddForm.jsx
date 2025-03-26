import { useState, useContext } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  Platform,
  ScrollView,
  TouchableOpacity
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { SettingsContext } from "../context/SettingsContext";
import { useClothes } from "../data/apiData";
import { globalStyles } from "../styles/allStyles";
import { Button } from "../components";

export default function AddForm({ onClose }) {
  const { createItem, refetch } = useClothes();
  const { theme } = useContext(SettingsContext);

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

    const newItem = {
      name,
      category: { main: category },
      condition,
      notes,
      lastUsed: lastUsed ? new Date(lastUsed) : null,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      clearedAt: null
    };

    await createItem(newItem);
    await refetch();
    Alert.alert("Lyckades!", "Plagget har lagts till.");
    onClose();
  };

  return (
    <ScrollView>
      <Text style={[globalStyles.sectionTitle, { color: theme.text }]}>
        Plagginformation
      </Text>

      <Text style={{ color: theme.text, marginTop: 5 }}>Namn</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="T.ex. svart tröja"
        placeholderTextColor={globalStyles.text}
        value={name}
        onChangeText={setName}
      />

      <Text style={{ color: theme.text, marginTop: 5 }}>Kategori</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="T.ex. ytterplagg"
        placeholderTextColor={globalStyles.text}
        value={category}
        onChangeText={setCategory}
      />

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

      <Text style={{ color: theme.text, fontSize: 16, fontWeight: "bold" }}>
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

      <Text style={{ color: theme.text, marginTop: 5 }}>Taggar</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="T.ex. vardag, sommar"
        placeholderTextColor={globalStyles.text}
        value={tags}
        onChangeText={setTags}
      />

      <Text style={{ color: theme.text, marginTop: 5 }}>Anteckningar</Text>
      <TextInput
        style={[globalStyles.input, { height: 70 }]}
        placeholder="T.ex. fått av mamma"
        placeholderTextColor={globalStyles.text}
        value={notes}
        onChangeText={setNotes}
        multiline
      />

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
  );
}
