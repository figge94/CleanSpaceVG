import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "../components";
import { globalStyles, buttonStyles, tagStyles } from "../styles/allStyles";
import { detailStyles } from "../styles/screensStyles";

export default function DetailCard({
  item,
  theme,
  onGoBack,
  onEdit,
  onDelete
}) {
  return (
    <>
      {/* Taggar */}
      {item.tags && item.tags.length > 0 && (
        <View style={tagStyles.tagContainer}>
          {item.tags.map((tag, index) => (
            <View
              key={index}
              style={[tagStyles.tag, { backgroundColor: theme.tagBackground }]}>
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

      {/* Footer med datum och knappar */}
      <View style={detailStyles.centeredContainer}>
        <Text style={[globalStyles.sectionTitle, { color: theme.text }]}>
          Tillagd:
        </Text>
        <Text style={{ color: theme.text }}>
          {new Date(item.createdAt).toLocaleDateString("sv-SE")}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onGoBack}
        style={[
          buttonStyles.backButton,
          { backgroundColor: theme.buttonBackground }
        ]}>
        <MaterialIcons name="arrow-back" size={24} color="white" />
        <Text style={buttonStyles.backButton}>Gå tillbaka</Text>
      </TouchableOpacity>

      <Button
        title="Redigera"
        onPress={onEdit}
        theme={theme}
        icon={<MaterialIcons name="edit" size={20} color={theme.buttonText} />}
      />

      <Button
        title="Ta bort"
        onPress={onDelete}
        theme={{
          ...theme,
          buttonBackground: "#C62828",
          buttonText: "#fff"
        }}
        icon={<MaterialIcons name="delete" size={20} color="#fff" />}
      />
    </>
  );
}
