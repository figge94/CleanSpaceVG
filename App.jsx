import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// Import av alla sidor
import HomeScreen from "./pages/Home";
import ClothesScreen from "./pages/Clothes";
import DetailsScreen from "./pages/Details";
import TipsScreen from "./pages/Tips";
import ProfileScreen from "./pages/Profile";
import StatisticsScreen from "./pages/Statistic";
import { SettingsProvider, SettingsContext } from "./context/SettingsContext"; // Hanterar ljust/mörkt tema
import BarcodeScannerScreen from "./pages/BarcodeScanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IntroScreen from "./pages/IntroScreen";

// Hindra splash-screen från att stängas automatiskt
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator(); // Bottom navigation
const Stack = createStackNavigator(); // Stack navigation

// Returnerar ikoner för varje tab
const getTabBarIcon = (routeName, focused, color, size) => {
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
};

// Navigering med bottentabs för huvudvyer
function BottomTabs() {
  const { theme } = useContext(SettingsContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) =>
          getTabBarIcon(route.name, focused, color, size),
        tabBarActiveTintColor: theme.buttonBackground,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: theme.cardBackground,
          paddingBottom: 5,
          height: 60,
          position: "absolute"
        }
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Hem" }}
      />
      <Tab.Screen
        name="Clothes"
        component={ClothesScreen}
        options={{ title: "Min garderob" }}
      />
      <Tab.Screen
        name="Tips"
        component={TipsScreen}
        options={{ title: "Tips" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profil" }}
      />
    </Tab.Navigator>
  );
}

// Hanterar stack-navigation inklusive intro-flöde
function MainStack() {
  const [initialRoute, setInitialRoute] = useState(null); // Avgör om Intro eller Tabs ska visas först

  // Kontrollera om användaren sett intro tidigare
  useEffect(() => {
    const checkIntro = async () => {
      const seen = await AsyncStorage.getItem("hasSeenIntro");
      setInitialRoute(seen === "true" ? "Tabs" : "Intro");
    };
    checkIntro();
  }, []);

  // Visa laddningsindikator tills route är bestämd
  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Stack-navigering: introduktion, tabs, detaljer m.m.
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen name="Intro" component={IntroScreen} />

      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Clothes"
        component={ClothesScreen}
        options={{ title: "Min garderob" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: "Detaljer" }}
      />
      <Stack.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{ title: "Statistik" }}
      />
      <Stack.Screen name="BarcodeScanner" component={BarcodeScannerScreen} />
    </Stack.Navigator>
  );
}

// NavigationContainer omsluter navigationen och tillämpar tema
function AppContent() {
  const { theme, darkMode } = useContext(SettingsContext); //  Hanterar ljust/mörkt tema

  return (
    <NavigationContainer
      theme={darkMode ? DarkTheme : DefaultTheme} // Navigationens inbyggda färger
    >
      <MainStack />
    </NavigationContainer>
  );
}

// Appens rotkomponent – förser appen med globalt tema via context
export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}
