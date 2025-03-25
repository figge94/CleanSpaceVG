import React from "react";
import { View, Image } from "react-native";
import wardrobeImg from "../../assets/wardrobe.png";
import { imageStyles } from "../styles/allStyles";

export default function HomeHeader() {
  return (
    <View style={imageStyles.headerContainer}>
      <Image source={wardrobeImg} style={imageStyles.wardrobeImage} />
    </View>
  );
}
