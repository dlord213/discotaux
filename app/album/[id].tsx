import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View, useWindowDimensions } from "react-native";
import {
  ActivityIndicator,
  useTheme,
  Text,
  Card,
  Chip,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import useReleasesStore from "@/stores/useReleasesStore";
import useAlbumStore from "@/stores/useAlbumStore";

export default function Page() {
  const theme = useTheme();
  const { id } = useLocalSearchParams();
  const { height: screenHeight } = useWindowDimensions();

  const { SPOTIFY_TOKEN } = useReleasesStore();
  const { getAlbumData, formatTime } = useAlbumStore();

  const [mode, setMode] = useState(1);

  useFocusEffect(
    useCallback(() => {
      if (theme.dark) {
        NavigationBar.setBackgroundColorAsync(theme.colors.elevation.level2);
      } else {
        NavigationBar.setBackgroundColorAsync(theme.colors.elevation.level1);
      }
    }, [theme.dark])
  );

  const { data: albumData, isFetching: isAlbumDataFetching } = useQuery({
    queryFn: () => getAlbumData(id, SPOTIFY_TOKEN),
    queryKey: [id],
  });

  if (!isAlbumDataFetching)
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Card mode="contained">
          <Card.Cover
            source={{
              uri: albumData?.images[0].url || "",
              cache: "force-cache",
            }}
            style={{
              position: "absolute",
              opacity: 0.6,
              width: "100%",
              height: "100%",
            }}
          />
          <Card.Content
            style={{
              padding: 16,
              backgroundColor: theme.colors.background.toString() + "CF",
              gap: 8,
            }}
          >
            <Text
              variant="headlineSmall"
              style={{ color: theme.colors.onBackground, fontWeight: "bold" }}
            >
              {albumData?.name}
            </Text>
            <Text
              variant="bodyMedium"
              style={{
                opacity: 0.7,
                color: theme.colors.onBackground,
                fontWeight: "bold",
              }}
            >
              {albumData?.artists[0].name}
            </Text>
          </Card.Content>
        </Card>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Chip
            mode={mode == 0 ? "flat" : "outlined"}
            onPress={() => {
              setMode(0);
            }}
            style={{ flex: 1 }}
          >
            Reviews
          </Chip>
          <Chip
            mode={mode == 1 ? "flat" : "outlined"}
            onPress={() => {
              setMode(1);
            }}
            style={{ flex: 1 }}
          >
            Tracks
          </Chip>
        </View>
        {mode == 0 ? null : (
          <FlatList
            data={albumData?.tracks.items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text variant="titleMedium" style={{ flex: 1 }}>
                  {item.track_number}
                </Text>
                <Card mode="contained" style={{ flex: 12 }}>
                  <Card.Content style={{}}>
                    <Text
                      variant="titleMedium"
                      style={{
                        fontWeight: "bold",
                        color: theme.colors.onSurface,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      variant="titleSmall"
                      style={{ color: theme.colors.onSurfaceVariant }}
                    >
                      {formatTime(item.duration_ms)}
                    </Text>
                  </Card.Content>
                </Card>
              </View>
            )}
            contentContainerStyle={{ gap: 12 }}
          />
        )}
      </SafeAreaView>
    );

  return (
    <SafeAreaView
      style={[
        styles.safeAreaView,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <ActivityIndicator size={48} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
});
