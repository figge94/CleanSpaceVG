import { useContext, useState, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput
} from "react-native";
import { SettingsContext } from "../context/SettingsContext"; // Hantering av ljust/mörkt tema
import { GlobalStyle } from "../styles/global/GlobalStyle";
import Card from "../components/Card"; // Kort-komponent som visar plaggen
import { useClothes } from "../data/apiData"; // Hämtar data från api
import { MaterialIcons } from "@expo/vector-icons";
import AddClothesForm from "../components/AddClothesForm"; // Formulärkomponent för att lägga till plagg
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

// Funktion som visar 'min garderob' och innehåller funktioner för sökning, filtrering, favoritmarkering, samt lägg till-funktion
export default function ClothesScreen({ navigation }) {
  const { theme } = useContext(SettingsContext);
  const { data, isLoading, error, refetch, deleteItem } = useClothes();
  const [selectedCategory, setSelectedCategory] = useState("Alla");
  const [modalVisible, setModalVisible] = useState(false); // Visar eller döljer modal
  const [searchQuery, setSearchQuery] = useState(""); // Sökfältets innehåll
  const [favorites, setFavorites] = useState({}); // Favoritmarkerade plagg
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false); // Filtrerar för att endast kunna visa sina favoriter
  const [qrCodes, setQrCodes] = useState({}); // Eventuellt lagrade QR-koder per plagg

  // Skapar en lista med alla kategorier baserat på befintliga plagg
  const categories = [
    "Alla",
    ...new Set(data.map((item) => item.category?.main || "Okänd"))
  ];

  // Filtrerar plaggen efter kategori, sökfras och favoritstatus
  const filteredData = data.filter((item) => {
    const matchKategori =
      selectedCategory === "Alla" || item.category?.main === selectedCategory;

    const matchSökning = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const isFavorite = favorites[item._id];

    return matchKategori && matchSökning && (!showOnlyFavorites || isFavorite);
  });

  // Växla favoritstatus för ett plagg och spara i AsyncStorage
  const toggleFavorite = async (itemId) => {
    const newFavorites = {
      ...favorites,
      [itemId]: !favorites[itemId]
    };
    setFavorites(newFavorites);

    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
    } catch (e) {
      console.error("Kunde inte spara favoriter", e);
    }
  };

  // Läser in favoriter från AsyncStorage vid första inladdning
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem("favorites");
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (e) {
        console.error("Kunde inte ladda favoriter", e);
      }
    };

    loadFavorites();
  }, []);

  // Hämtar QR-koder varje gång skärmen blir aktiv igen (t.ex. efter skanning)
  useFocusEffect(
    useCallback(() => {
      const loadQRCodes = async () => {
        const newQrCodes = {};
        for (const item of data) {
          const code = await AsyncStorage.getItem(`barcode-${item._id}`);
          if (code) {
            newQrCodes[item._id] = code;
          }
        }
        setQrCodes(newQrCodes);
      };

      if (data?.length > 0) {
        loadQRCodes();
      }
    }, [data])
  );

  return (
    <View
      style={[GlobalStyle.container, { backgroundColor: theme.background }]}>
      <Text style={[GlobalStyle.title, { color: theme.text }]}>
        Min garderob
      </Text>

      {/* Visar kategoriknappar */}
      <View style={{ marginBottom: 15, paddingHorizontal: 10 }}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item }) => {
            const isSelected = selectedCategory === item;
            return (
              <TouchableOpacity
                onPress={() => setSelectedCategory(item)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginHorizontal: 3,
                  borderRadius: 8,
                  backgroundColor: isSelected
                    ? theme.buttonBackground
                    : theme.cardBackground,
                  borderWidth: 1,
                  borderColor: theme.borderColor,
                  elevation: isSelected ? 4 : 0
                }}>
                <Text
                  style={{
                    color: isSelected ? "#fff" : theme.text,
                    fontWeight: "bold",
                    fontSize: 16,
                    textAlign: "center"
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Knapp som växlar mellan att visa alla plagg eller bara favoriter */}
      <TouchableOpacity
        onPress={() => setShowOnlyFavorites(!showOnlyFavorites)}
        style={{
          backgroundColor: theme.buttonBackground,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 10,
          marginBottom: 10,
          alignSelf: "center"
        }}>
        <Text
          style={{ color: theme.buttonText, fontWeight: "bold", fontSize: 16 }}>
          {showOnlyFavorites ? "Visa alla plagg" : "Visa bara favoriter"}
        </Text>
      </TouchableOpacity>

      {/* Sökfält */}
      <TextInput
        placeholder="Sök plagg..."
        placeholderTextColor={theme.text}
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{
          backgroundColor: theme.cardBackground,
          color: theme.text,
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: theme.borderColor
        }}
      />

      {/* Lista med plagg */}
      <View style={{ flex: 1, marginBottom: 20 }}>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.text} />
        ) : error ? (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Card
                key={item._id}
                item={item}
                theme={theme}
                onPress={() => navigation.navigate("Details", { item })}
                onToggleFavorite={() => toggleFavorite(item._id)}
                hasQRCode={!!qrCodes[item._id]}
                isFavorite={favorites[item._id]} // 🧠 viktigt!
              />
            )}
          />
        )}
      </View>

      {/* Knapp som öppnar modal för att lägga till nytt plagg */}
      <TouchableOpacity
        style={{
          backgroundColor: theme.buttonBackground,
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 10,
          alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10
        }}
        onPress={() => setModalVisible(true)} // 🆕 Öppnar modal
      >
        <MaterialIcons name="add" size={22} color={theme.buttonText} />
        <Text
          style={{
            color: theme.buttonText,
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 5
          }}>
          Lägg till plagg
        </Text>
      </TouchableOpacity>

      {/* Modal som innehåller formuläret för att lägga till ett plagg */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <View
            style={{
              width: "90%",
              backgroundColor: theme.cardBackground,
              padding: 20,
              borderRadius: 10
            }}>
            <Text style={[GlobalStyle.title, { color: theme.text }]}>
              Lägg till plagg
            </Text>

            <AddClothesForm onClose={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
