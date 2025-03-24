import React from "react";
import { View, Image } from "react-native";
import wardrobeImg from "../../assets/wardrobe.png";
import { ImageStyle } from "../../styles/ImageStyle";

export default function HomeHeader() {
  return (
    <View style={ImageStyle.headerContainer}>
      <Image source={wardrobeImg} style={ImageStyle.wardrobeImage} />
    </View>
  );
}
