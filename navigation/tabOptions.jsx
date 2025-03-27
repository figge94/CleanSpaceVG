// navigation/tabOptions.js
import getTabBarIcon from "./getTabBarIcon";
import { theme } from "../styles/styles";

export const getScreenOptions = () => ({
  headerShown: false,
  tabBarIcon: ({ focused, color, size, route }) =>
    getTabBarIcon(route.name, focused, color, size), // Uppdatera här
  tabBarActiveTintColor: theme.buttonBackground,
  tabBarInactiveTintColor: "gray",
  tabBarStyle: {
    backgroundColor: theme.cardBackground,
    paddingBottom: 5,
    height: 60,
    position: "absolute"
  }
});
