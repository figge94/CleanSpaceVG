import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert
} from "react-native";
import { MaterialIcons, EvilIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../context/SettingsContext"; // Hanterar ljust/mörkt tema
import { GlobalStyle } from "../styles/global/GlobalStyle";
import { BackHandler } from "react-native"; // Hanterar hårdvarubakknapp
import ButtonStyle from "../styles/ButtonStyle";
import { TagStyle } from "../styles/TagStyle";
import { DetailStyle } from "../styles/pages/DetailStyle";
import { useClothes } from "../data/apiData"; // Hämtar data från api
import EditClothesForm from "../components/EditClothesForm"; // Komponent med redigeringsformulär
import Button from "../components/Button";
import QRCode from "react-native-qrcode-svg"; // För att visa QR-kod
import AsyncStorage from "@react-native-async-storage/async-storage";

// Sida som visar detaljer om ett plagg, med möjlighet att redigera, ta bort eller skapa QR-kod
export default function DetailsScreen({ route, navigation }) {
  const { theme } = useContext(SettingsContext);
  const { deleteItem } = useClothes(); // Hook för API-borttagning
  const item = route.params?.item;

  const [modalVisible, setModalVisible] = useState(false); // Visar/döljer redigeringsmodal
  const [loadingBarcode, setLoadingBarcode] = useState(false); // Visar laddningsstatus för QR
  const [localBarcode, setLocalBarcode] = useState(null); // Lagrad QR-kod

  // Funktion som genererar och sparar en QR-kod lokalt
  const handleGenerateBarcode = async () => {
    try {
      setLoadingBarcode(true);
      const generatedCode = "plagg-" + item._id;

      // 🔸 Spara bara lokalt
      await AsyncStorage.setItem(`barcode-${item._id}`, generatedCode);
      setLocalBarcode(generatedCode);

      Alert.alert("Klart!", "QR-kod har genererats och sparats lokalt.");
    } catch (error) {
      Alert.alert("Fel", "Kunde inte spara QR-koden.");
      console.error(error);
    } finally {
      setLoadingBarcode(false);
    }
  };

  // Gå tillbaka vid tryck på Androids bakknapp
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    // Bekräftar och raderar ett plagg från API
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  const handleDelete = async () => {
    Alert.alert(
      "Ta bort plagg",
      "Är du säker på att du vill ta bort detta plagg?",
      [
        { text: "Avbryt", style: "cancel" },
        {
          text: "Ta bort",
          onPress: async () => {
            try {
              await deleteItem(item._id); // Raderar från backend
              navigation.goBack(); // Navigerar tillbaka
            } catch (error) {
              console.error("Fel vid borttagning:", error);
              Alert.alert("Fel!", "Kunde inte ta bort plagget.");
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  // Läser in eventuell QR-kod från lagring
  useEffect(() => {
    const loadBarcode = async () => {
      try {
        const code = await AsyncStorage.getItem(`barcode-${item._id}`);
        if (code) {
          setLocalBarcode(code);
        }
      } catch (e) {
        console.error("Kunde inte läsa lokal QR-kod:", e);
      }
    };

    loadBarcode();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={DetailStyle.scrollContainer}>
        <View style={{ paddingVertical: 15, alignItems: "center" }}>
          <Text style={[DetailStyle.headerTitle, { color: theme.text }]}>
            {item.name}
          </Text>
        </View>

        {/* Visar taggar om de finns */}
        {item.tags && item.tags.length > 0 && (
          <View style={TagStyle.tagContainer}>
            {item.tags.map((tag, index) => (
              <View
                key={index}
                style={[
                  TagStyle.tag,
                  { backgroundColor: theme.tagBackground }
                ]}>
                <Text style={[TagStyle.tagText, { color: theme.buttonText }]}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View
          style={[
            DetailStyle.detailsCard,
            { backgroundColor: theme.cardBackground }
          ]}>
          <Text style={[DetailStyle.sectionTitle, { color: theme.text }]}>
            Kategori:
          </Text>
          <Text style={[DetailStyle.content, { color: theme.text }]}>
            {item.category?.main} / {item.category?.sub}
          </Text>
          <Text style={[DetailStyle.sectionTitle, { color: theme.text }]}>
            Skick:
          </Text>
          <Text style={[DetailStyle.content, { color: theme.text }]}>
            {item.condition}
          </Text>
          <Text style={[DetailStyle.sectionTitle, { color: theme.text }]}>
            Senast använd:
          </Text>
          <Text style={[DetailStyle.content, { color: theme.text }]}>
            {item.lastUsed
              ? new Date(item.lastUsed).toLocaleDateString("sv-SE")
              : "Okänt"}
          </Text>
        </View>

        {item.notes && (
          <View
            style={[
              DetailStyle.noteContainer,
              { backgroundColor: theme.cardBackground }
            ]}>
            <Text style={[DetailStyle.sectionTitle, { color: theme.text }]}>
              Noteringar:
            </Text>

            <View
              style={[
                {
                  backgroundColor:
                    theme.background === "#121212" ? "#1A1A1A" : "#f5f5f5",
                  borderColor: theme.borderColor
                }
              ]}>
              <Text style={[DetailStyle.notes, { color: theme.text }]}>
                {item.notes}
              </Text>
            </View>
          </View>
        )}
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          {localBarcode ? (
            <>
              <Text style={{ color: theme.text, marginBottom: 10 }}>
                QR-kod för plagget:
              </Text>
              <QRCode value={localBarcode} size={160} />
            </>
          ) : (
            <Button
              title={loadingBarcode ? "Genererar..." : "Generera QR-kod"}
              onPress={handleGenerateBarcode}
              theme={theme}
              icon={
                <MaterialIcons
                  name="qr-code"
                  size={20}
                  color={theme.buttonText}
                />
              }
            />
          )}
        </View>
        {localBarcode && (
          <View
            style={{
              alignItems: "center",
              paddingVertical: 10,
              flexDirection: "row",
              justifyContent: "center"
            }}>
            <MaterialIcons
              name="qr-code"
              size={22}
              color={theme.text}
              style={{ marginRight: 6 }}
            />
            <Text style={{ color: theme.text }}>
              QR-kod sparad för detta plagg
            </Text>
          </View>
        )}

        <View style={DetailStyle.centeredContainer}>
          <Text style={[DetailStyle.sectionTitle, { color: theme.text }]}>
            Tillagd:
          </Text>
          <Text style={[{ color: theme.text }]}>
            {new Date(item.createdAt).toLocaleDateString("sv-SE")}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            ButtonStyle.backButton,
            { backgroundColor: theme.buttonBackground }
          ]}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
          <Text style={ButtonStyle.backButton}>Gå tillbaka</Text>
        </TouchableOpacity>

        {/* 🔹 Redigera-knapp */}
        <Button
          title="Redigera"
          onPress={() => setModalVisible(true)}
          theme={theme}
          icon={
            <MaterialIcons name="edit" size={20} color={theme.buttonText} />
          }
        />

        <Button
          title="Ta bort"
          onPress={handleDelete} // 👈 Skicka INTE item._id här
          theme={{
            ...theme,
            buttonBackground: "#C62828",
            buttonText: "#fff"
          }}
          icon={<MaterialIcons name="delete" size={20} color="#fff" />}
        />

        {/* 🔹 Modal för att redigera plagg */}
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
                Redigera plagg
              </Text>

              {/* 🆕 Formulär för att redigera */}
              <EditClothesForm
                item={item}
                onClose={() => setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}
