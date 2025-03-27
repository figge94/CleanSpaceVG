import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// getTabBarIcon - Dynamiskt sätta rätt ikon beroende på vilken flik och om den är fokuserad
export default function getTabBarIcon(routeName, focused, color, size) {
  const icons = {
    Home: focused ? "home-variant" : "home-variant-outline", // Hemsidan
    Clothes: focused ? "wardrobe" : "wardrobe-outline", // Kläder
    Tips: focused ? "lightbulb-on" : "lightbulb-on-outline", // Tips
    Profile: focused ? "person-circle" : "person-circle-outline" // Profil
  };

  // Returnera rätt ikon baserat på den aktuella fliken
  return routeName === "Profile" ? (
    // Använd Ionicons för Profile-fliken
    <Ionicons name={icons[routeName]} size={size} color={color} />
  ) : (
    // Använd MaterialCommunityIcons för övriga flikar
    <MaterialCommunityIcons name={icons[routeName]} size={size} color={color} />
  );
}
