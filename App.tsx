import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import { ThemeProvider } from "./src/context/ThemeContext";
import { GameSettingsProvider } from "./src/context/GameSettingsContext";
import BootSplash from "react-native-bootsplash";
import { preloadAllAssets } from "./src/game/pieceAssets";
import PreloadImages from "./src/components/PreloadImages";

export default function App() {
  const handleReady = async () => {
    try {
      await preloadAllAssets();
    } catch (e) {
      console.warn("Failed to preload some assets", e);
    } finally {
      BootSplash.hide({ fade: true });
    }
  };

  return (
    <ThemeProvider>
      <GameSettingsProvider>
        <PreloadImages />
        <NavigationContainer onReady={handleReady}>
          <StackNavigator />
        </NavigationContainer>
      </GameSettingsProvider>
    </ThemeProvider>
  );
}
