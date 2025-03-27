import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  BackHandler,
  TouchableOpacity
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SettingsContext } from "../context/SettingsContext";
import {
  globalStyles,
  detailStyles,
  tagStyles,
  buttonStyles
} from "../styles/styles";
import { useClothes } from "../data/apiData";
import { Button, EditModal } from "../components";
import useDeleteConfirmation from "../hooks/useDeleteConfirmation";
import useBackButtonHandler from "../hooks/useBackButtonHandler";

export default function DetailsScreen({ route, navigation }) {
  const { theme } = useContext(SettingsContext);
  const { deleteItem } = useClothes();
  const item = route.params?.item;
  const [modalVisible, setModalVisible] = useState(false);

  const confirmDelete = useDeleteConfirmation(deleteItem, () =>
    navigation.goBack()
  );

  useBackButtonHandler(() => navigation.goBack());

  if (!item) {
    return (
      <View
        style={[globalStyles.container, { backgroundColor: theme.background }]}>
        <Text style={[globalStyles.errorText, { color: theme.text }]}>
          Ingen information tillgänglig
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={detailStyles.scrollContainer}>
        <View style={{ paddingVertical: 15, alignItems: "center" }}>
          <Text style={[globalStyles.title, { color: theme.text }]}>
            {item.name}
          </Text>
        </View>

        {/* Taggar */}
        {item.tags && item.tags.length > 0 && (
          <View style={tagStyles.tagContainer}>
            {item.tags.map((tag, index) => (
              <View
                key={index}
                style={[
                  tagStyles.tag,
                  { backgroundColor: theme.tagBackground }
                ]}>
                <Text style={[tagStyles.tagText, { color: theme.buttonText }]}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Info-kort */}
        <View
          style={[
            detailStyles.detailsCard,
            { backgroundColor: theme.cardBackground }
          ]}>
          <Text style={[globalStyles.sectionTitle, { color: theme.text }]}>
            Kategori:
          </Text>
          <Text style={{ color: theme.text }}>
            {item.category?.main} / {item.category?.sub}
          </Text>

          <Text style={[globalStyles.sectionTitle, { color: theme.text }]}>
            Skick:
          </Text>
          <Text style={{ color: theme.text }}>{item.condition}</Text>

          <Text style={[globalStyles.sectionTitle, { color: theme.text }]}>
            Senast använd:
          </Text>
          <Text style={{ color: theme.text }}>
            {item.lastUsed
              ? new Date(item.lastUsed).toLocaleDateString("sv-SE")
              : "Okänt"}
          </Text>
        </View>

        {/* Noteringar */}
        {item.notes && (
          <View
            style={[
              detailStyles.noteContainer,
              { backgroundColor: theme.cardBackground }
            ]}>
            <Text style={[globalStyles.sectionTitle, { color: theme.text }]}>
              Noteringar:
            </Text>
            <View
              style={{
                backgroundColor:
                  theme.background === "#121212" ? "#1A1A1A" : "#f5f5f5",
                borderColor: theme.borderColor,
                padding: 10,
                borderRadius: 6
              }}>
              <Text style={[detailStyles.notes, { color: theme.text }]}>
                {item.notes}
              </Text>
            </View>
          </View>
        )}

        {/* Datum och knappar */}
        <View style={detailStyles.centeredContainer}>
          <Text style={[globalStyles.sectionTitle, { color: theme.text }]}>
            Tillagd:
          </Text>
          <Text style={{ color: theme.text }}>
            {new Date(item.createdAt).toLocaleDateString("sv-SE")}
          </Text>
        </View>

        <View style={buttonStyles.buttonContainer}>
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
            onPress={() =>
              confirmDelete(item._id, {
                title: "Radera plagg",
                message: `Vill du verkligen ta bort "${item.name}"?`,
                successMessage: `"${item.name}" har tagits bort.`
              })
            }
            theme={{
              ...theme,
              buttonBackground: "#C62828",
              buttonText: "#fff"
            }}
            icon={<MaterialIcons name="delete" size={20} color="#fff" />}
          />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              buttonStyles.button,
              { backgroundColor: theme.buttonBackground }
            ]}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
            <Text style={buttonStyles.backButton}>Gå tillbaka</Text>
          </TouchableOpacity>
        </View>

        <EditModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          item={item}
          theme={theme}
        />
      </ScrollView>
    </View>
  );
}
