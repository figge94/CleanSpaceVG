// navigation/tabOptions.js
import getTabBarIcon from "./getTabBarIcon";

export const getScreenOptions = () => ({
  headerShown: false,
  tabBarIcon: ({ focused, color, size, route }) =>
    getTabBarIcon(route.name, focused, color, size), // Uppdatera här
  tabBarActiveTintColor: buttonBackground,
  tabBarInactiveTintColor: "gray",
  tabBarStyle: {
    backgroundColor: cardBackground,
    paddingBottom: 5,
    height: 60,
    position: "absolute"
  }
});
