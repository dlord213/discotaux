import React, { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Banner,
  Icon,
  Text,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";

import useAuthStore from "@/stores/useAuthStore";
import useReleasesStore from "@/stores/useReleasesStore";
import MusicCard from "@/components/MusicCard";

export default function Index() {
  const theme = useTheme();

  const [bannerVisibility, setBannerVisibility] = useState(true);

  const { isLoggedIn } = useAuthStore();
  const { CACHE_KEY, getNewAlbumReleases } = useReleasesStore();

  const { data, isFetching, isRefetching, refetch } =
    useQuery({
      queryKey: ["new-releases"],
      queryFn: getNewAlbumReleases,
    });

  useFocusEffect(
    useCallback(() => {
      if (theme.dark) {
        NavigationBar.setBackgroundColorAsync(theme.colors.elevation.level2);
      } else {
        NavigationBar.setBackgroundColorAsync(theme.colors.elevation.level1);
      }
    }, [theme.dark])
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={{ gap: 8 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
            New releases
          </Text>
          <Pressable>
            <Icon
              source="table-settings"
              color={theme.colors.onBackground}
              size={24}
            />
          </Pressable>
        </View>
        {isLoggedIn ? null : (
          <Banner
            visible={bannerVisibility}
            icon={({ size }) => <Icon source="alert-box" size={size} />}
            style={{
              display: bannerVisibility ? "flex" : "none",
              borderRadius: theme.roundness,
              marginTop: 8,
            }}
            actions={[
              {
                label: "Maybe later",
                onPress: () => setBannerVisibility(false),
              },
              {
                label: "Login",
                onPress: () => setBannerVisibility(false),
              },
            ]}
          >
            <Text variant="labelLarge">
              You're not logged in. Login/register to write/rate about your
              favorite album!
            </Text>
          </Banner>
        )}
      </View>
      {!isFetching ? (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={async () => {
                await AsyncStorage.removeItem(CACHE_KEY);
                refetch();
              }}
            />
          }
          data={data?.albums.items || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <MusicCard
              image_url={item.images[0].url}
              title={item.name}
              description={item.artists[0].name}
              onPress={() => router.push({ pathname: "/album/[id]", params: { id: item.id } })}
            />
          )}
          ListEmptyComponent={<Text>No data available</Text>}
          contentContainerStyle={{ gap: 8 }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={48} color={theme.colors.primary} />
        </View>
      )}
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
