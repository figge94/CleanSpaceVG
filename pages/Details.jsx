import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, BackHandler, Alert } from "react-native";
import { SettingsContext } from "../context/SettingsContext";
import { GlobalStyle } from "../styles/global/GlobalStyle";
import { DetailStyle } from "../styles/pages/DetailStyle";
import { useClothes } from "../data/apiData";
import DetailCard from "../components/details/DetailCard";
import DetailTags from "../components/details/DetailTags";
import DetailNotes from "../components/details/DetailNotes";
import DetailFooter from "../components/details/DetailFooter";
import EditClothesModal from "../components/details/EditClothesModal";

// ✅ Detaljsida för ett plagg
export default function DetailsScreen({ route, navigation }) {
  const { theme } = useContext(SettingsContext);
  const { deleteItem } = useClothes();
  const item = route.params?.item;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  const handleDelete = () => {
    Alert.alert(
      "Ta bort plagg",
      "Är du säker på att du vill ta bort detta plagg?",
      [
        { text: "Avbryt", style: "cancel" },
        {
          text: "Ta bort",
          onPress: async () => {
            try {
              await deleteItem(item._id);
              navigation.goBack();
            } catch (err) {
              Alert.alert("Fel!", "Kunde inte ta bort plagget.");
              console.error(err);
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  if (!item) {
    return (
      <View
        style={[GlobalStyle.container, { backgroundColor: theme.background }]}>
        <Text style={[GlobalStyle.errorText, { color: theme.text }]}>
          Ingen information tillgänglig
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={DetailStyle.scrollContainer}>
        <View style={{ paddingVertical: 15, alignItems: "center" }}>
          <Text style={[DetailStyle.headerTitle, { color: theme.text }]}>
            {item.name}
          </Text>
        </View>

        <DetailTags tags={item.tags} theme={theme} />
        <DetailCard item={item} theme={theme} />
        <DetailNotes notes={item.notes} theme={theme} />

        <DetailFooter
          item={item}
          theme={theme}
          onGoBack={() => navigation.goBack()}
          onEdit={() => setModalVisible(true)}
          onDelete={handleDelete}
        />

        <EditClothesModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          item={item}
          theme={theme}
        />
      </ScrollView>
    </View>
  );
}
