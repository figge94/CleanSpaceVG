import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, BackHandler } from "react-native";
import { SettingsContext } from "../context/SettingsContext";
import { globalStyles } from "../styles/allStyles";
import { detailStyles } from "../styles/screensStyles";
import { useClothes } from "../data/apiData";
import DetailCard from "../components/DetailCard";
import EditModal from "../components/EditModal";
import useDeleteConfirmation from "../context/useDeleteConfirmation";

export default function DetailsScreen({ route, navigation }) {
  const { theme } = useContext(SettingsContext);
  const { deleteItem } = useClothes();
  const item = route.params?.item;
  const [modalVisible, setModalVisible] = useState(false);

  const confirmDelete = useDeleteConfirmation(deleteItem, navigation);

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

        <DetailCard
          item={item}
          theme={theme}
          onGoBack={() => navigation.goBack()}
          onEdit={() => setModalVisible(true)}
          onDelete={() => confirmDelete(item._id)}
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
