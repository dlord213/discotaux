import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Chip,
  Icon,
  Text,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import useChartsStore from "@/stores/useChartsStore";
import MusicCard from "@/components/MusicCard";

export default function Page() {
  const theme = useTheme();

  const [titleString, setTitleString] = useState<string>("Top albums");
  const [chipSelected, setChipSelected] = useState(0);

  const { getTopTracks } = useChartsStore();

  const { isPending, data, error } = useQuery({
    queryKey: ["top-tracks"],
    queryFn: getTopTracks,
    refetchIntervalInBackground: false,
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
        <Pressable>
          <Icon source="calendar-search" size={24} />
        </Pressable>
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Chip
          mode={chipSelected == 0 ? "flat" : "outlined"}
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
          {!isPending ? (
            <FlatList
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
