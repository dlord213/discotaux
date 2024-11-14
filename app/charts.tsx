import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { ActivityIndicator, Chip, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import useChartsStore from "@/stores/useChartsStore";
import MusicCard from "@/components/MusicCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Page() {
  const theme = useTheme();

  const [titleString, setTitleString] = useState<string>("Top tracks");
  const [chipSelected, setChipSelected] = useState(1);

  const { getTopTracks, CACHE_KEY } = useChartsStore();

  const { isPending, data, error, isFetching, isRefetching, refetch } =
    useQuery({
      queryKey: ["top-tracks"],
      queryFn: getTopTracks,
      enabled: true,
    });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
          {titleString}
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Chip
          mode={chipSelected == 0 ? "flat" : "outlined"}
          style={{ display: "none" }}
          onPress={() => {
            setChipSelected(0);
            setTitleString("Top albums");
          }}
        >
          Albums
        </Chip>
        <Chip
          mode={chipSelected == 1 ? "flat" : "outlined"}
          onPress={() => {
            setChipSelected(1);
            setTitleString("Top tracks");
          }}
        >
          Tracks
        </Chip>
      </View>
      {chipSelected == 0 ? (
        <></>
      ) : (
        <>
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
              data={data || []}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <MusicCard
                  title={item.details.track.name}
                  description={
                    item.details.track.wiki?.summary
                      ? String(item.details.track.wiki.summary)
                          .replace(/\n.*/s, "")
                          .replace(/<a[^>]*>(.*?)<\/a>/g, "$1")
                          .replace("Read more on Last.fm.", "")
                      : null
                  }
                  image_url={
                    item.details.track.album?.image
                      ? item.details.track.album.image[2]["#text"]
                      : ""
                  }
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
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
});
