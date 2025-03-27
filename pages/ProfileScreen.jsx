import React from "react";
import { Text, Image, View, Switch } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { buttonStyles, globalStyles, imageStyles } from "../styles/styles";
import { Button } from "../components";
import { theme } from "../styles/styles";

export default function ProfileScreen({ navigation }) {
  return (
    <View
      style={[globalStyles.container, { backgroundColor: theme.background }]}>
      <Image
        source={require("../assets/images/user.png")}
        style={imageStyles.profileImage}
      />

      <Text style={[globalStyles.username, { color: theme.textColor }]}>
        Webmaster
      </Text>
      <Text style={[globalStyles.email, { color: theme.textColor }]}>
        user@example.com
      </Text>

      <View style={buttonStyles.buttonContainer}>
        <Button
          icon={
            <MaterialIcons name="bar-chart" size={22} color={theme.textColor} />
          }
          title="Statistik"
          onPress={() => navigation.navigate("Statistics")}
        />
      </View>

      <View style={buttonStyles.buttonContainer}>
        <Text style={[globalStyles.subTitle, { color: theme.textColor }]}>
          Mörkt läge
        </Text>
      </View>
    </View>
  );
}
