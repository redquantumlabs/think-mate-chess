import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import RulesScreen from "../screens/RulesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { useTheme } from "../context/ThemeContext";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: isDark ? "#121212" : "#ffffff",
                    borderTopColor: isDark ? "#333" : "#e0e0e0",
                },
                tabBarIcon: ({ color, size }) => {
                    let iconName: any;

                    if (route.name === "Home") {
                        iconName = "home-outline";
                    } else if (route.name === "Rules") {
                        iconName = "book-outline";
                    } else if (route.name === "Settings") {
                        iconName = "settings-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },

                tabBarActiveTintColor: "#2e7d32",
                tabBarInactiveTintColor: isDark ? "#888" : "gray",
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Rules" component={RulesScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}