// hooks/useBackHandler.js
import { useEffect } from "react";
import { BackHandler } from "react-native";

export default function useBackHandler(onBackPress) {
  useEffect(() => {
    const backAction = () => {
      onBackPress();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [onBackPress]);
}
