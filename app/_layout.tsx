import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { merge } from "lodash";

import {
  PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
  configureFonts,
  adaptNavigationTheme,
} from "react-native-paper";
import {
  ThemeProvider,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

import WorkSansFont from "@/assets/fonts/WorkSans.ttf";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const materialDarkTheme = { ...MD3DarkTheme, colors: theme.dark };
  const materialLightTheme = { ...MD3LightTheme, colors: theme.light };

  const CombinedLightTheme = merge(LightTheme, materialLightTheme);
  const CombinedDarkTheme = merge(DarkTheme, materialDarkTheme);

  const paperTheme =
    colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;

  const fontConfig = {
    fontFamily: WorkSansFont,
  };

  return (
    <PaperProvider
      theme={{ ...paperTheme, fonts: configureFonts({ config: fontConfig }) }}
    >
      <ThemeProvider value={paperTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
