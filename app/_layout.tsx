import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { merge } from "lodash";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
  configureFonts,
  adaptNavigationTheme,
  BottomNavigation,
  Icon,
} from "react-native-paper";
import {
  ThemeProvider,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  CommonActions,
} from "@react-navigation/native";
import { useEffect } from "react";
import useAuthStore from "@/stores/useAuthStore";

const queryClient = new QueryClient();

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

  const fontConfig = {};

  const { loadStoredSession } = useAuthStore();

  useEffect(() => {
    loadStoredSession();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider
        theme={{ ...paperTheme, fonts: configureFonts({ config: fontConfig }) }}
      >
        <ThemeProvider value={paperTheme}>
          <Tabs
            screenOptions={{ headerShown: false }}
            tabBar={({ navigation, state, descriptors, insets }) => {
              const filteredRoutes = state.routes.filter(
                (route) =>
                  route.name !== "_sitemap" && route.name !== "+not-found"
              );

              return (
                <BottomNavigation.Bar
                  shifting
                  keyboardHidesNavigationBar={true}
                  navigationState={{ ...state, routes: filteredRoutes }}
                  safeAreaInsets={insets}
                  onTabPress={({ route, preventDefault }) => {
                    const event = navigation.emit({
                      type: "tabPress",
                      target: route.key,
                      canPreventDefault: true,
                    });
                    if (event.defaultPrevented) {
                      preventDefault();
                    } else {
                      navigation.dispatch({
                        ...CommonActions.navigate(route.name, route.params),
                        target: state.key,
                      });
                    }
                  }}
                  renderIcon={({ route, focused, color }) => {
                    const { options } = descriptors[route.key];
                    if (options.tabBarIcon) {
                      return options.tabBarIcon({ focused, color, size: 24 });
                    } else {
                      return null;
                    }
                  }}
                  getLabelText={({ route }) => {
                    const { options } = descriptors[route.key];
                    const label =
                      options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.title;
                    return label;
                  }}
                />
              );
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Releases",
                tabBarIcon: ({ size }) => (
                  <Icon source="star-box-multiple" size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="genres"
              options={{
                title: "Genres",
                tabBarIcon: ({ size }) => (
                  <Icon source="tag-multiple-outline" size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="charts"
              options={{
                title: "Charts",
                tabBarIcon: ({ size }) => (
                  <Icon source="calendar-text" size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: "Profile",
                tabBarIcon: ({ size }) => (
                  <Icon source="account-circle" size={size} />
                ),
              }}
            />
          </Tabs>
        </ThemeProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
