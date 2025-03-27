import { useEffect } from "react";
import { BackHandler } from "react-native";

/**
 * Custom hook for handling the back button press on Android.
 * @param {function} onBackPress - Function to be called when the back button is pressed.
 */
export default function useBackButtonHandler(onBackPress) {
  useEffect(() => {
    const backAction = () => {
      onBackPress();
      return true; // Prevent default behavior (back navigation)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Cleanup the event listener on unmount
    return () => {
      backHandler.remove();
    };
  }, [onBackPress]);
}
