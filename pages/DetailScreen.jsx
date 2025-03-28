import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles, theme, tagStyles, buttonStyles } from "../styles/styles";
import { useClothes } from "../data/apiData";
import { Button, EditModal } from "../components";
import useDeleteConfirmation from "../hooks/useDeleteConfirmation";
import useBackHandler from "../hooks/useBackHandler";
import useFormattedDates from "../hooks/useFormattedDates";
import { deleteAndArchiveItem } from "../utils/clothesUtils";
import ConfirmModal from "../components/ConfirmModal";

export default function DetailsScreen({ route, navigation }) {
  const { deleteItem, refetch } = useClothes();
  const item = route.params?.item;
  const [modalVisible, setModalVisible] = useState(false);
  const { createdAt, lastUsed } = useFormattedDates(item);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const confirmDelete = useDeleteConfirmation(() => {
    return deleteAndArchiveItem(item, deleteItem, () => {
      refetch();
      navigation.goBack();
    });
  });

  useBackHandler(() => navigation.goBack());

  // Show error message if no item exists
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
      <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
        <View style={{ paddingVertical: 15, alignItems: "center" }}>
          <Text style={[globalStyles.title, { color: theme.text }]}>
            {item.name}
          </Text>
        </View>

        {/* Tags display */}
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

        {/* Info card */}
        <View
          style={[
            globalStyles.detailsCard,
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
          <Text style={{ color: theme.text }}>{lastUsed}</Text>
        </View>

        {/* Notes display */}
        {item.notes && (
          <View
            style={[
              globalStyles.noteContainer,
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
              <Text style={[globalStyles.notes, { color: theme.text }]}>
                {item.notes}
              </Text>
            </View>
          </View>
        )}

        {/* Date and buttons */}
        <View style={globalStyles.centeredContainer}>
          <Text style={[globalStyles.sectionTitle, { color: theme.text }]}>
            Tillagd:
          </Text>
          <Text style={{ color: theme.text }}>{createdAt}</Text>
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
            onPress={() => setConfirmVisible(true)}
            theme={{
              ...theme,
              buttonBackground: "#C62828",
              buttonText: "#fff"
            }}
            icon={<MaterialIcons name="delete" size={20} color="#fff" />}
          />
        </View>

        <ConfirmModal
          visible={confirmVisible}
          message={`Vill du verkligen ta bort "${item.name}"?`}
          onCancel={() => setConfirmVisible(false)}
          onConfirm={() => {
            setConfirmVisible(false);
            deleteAndArchiveItem(item, deleteItem, () => {
              refetch();
              navigation.goBack();
            });
          }}
        />

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
