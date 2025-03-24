import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function getTabBarIcon(routeName, focused, color, size) {
  const icons = {
    Home: focused ? "home-variant" : "home-variant-outline",
    Clothes: focused ? "wardrobe" : "wardrobe-outline",
    Tips: focused ? "lightbulb-on" : "lightbulb-on-outline",
    Profile: focused ? "person-circle" : "person-circle-outline"
  };

  return routeName === "Profile" ? (
    <Ionicons name={icons[routeName]} size={size} color={color} />
  ) : (
    <MaterialCommunityIcons name={icons[routeName]} size={size} color={color} />
  );
}
