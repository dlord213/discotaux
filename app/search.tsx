import { FlatList, StyleSheet, View } from "react-native";
import {
  Chip,
  Searchbar,
  useTheme,
  Text,
  ActivityIndicator,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

import MusicCard from "@/components/MusicCard";
import useReleasesStore from "@/stores/useReleasesStore";
import useSearchStore from "@/stores/useSearchStore";

export default function Page() {
  const theme = useTheme();

  const {
    query,
    setQuery,
    mode,
    setMode,
    searchAlbum,
    searchTrack,
    searchArtist,
  } = useSearchStore();
  const { SPOTIFY_TOKEN } = useReleasesStore();

  const {
    isFetching: albumFetching,
    data: albumData,
    refetch: fetchAlbum,
  } = useQuery({
    queryKey: ["album"],
    queryFn: () => searchAlbum(SPOTIFY_TOKEN),
    enabled: false,
  });

  const {
    isFetching: trackFetching,
    data: trackData,
    refetch: fetchTrack,
  } = useQuery({
    queryKey: ["track"],
    queryFn: () => searchTrack(SPOTIFY_TOKEN),
    enabled: false,
  });

  const {
    isFetching: artistFetching,
    data: artistData,
    refetch: fetchArtist,
  } = useQuery({
    queryKey: ["artist"],
    queryFn: () => searchArtist(SPOTIFY_TOKEN),
    enabled: false,
  });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Searchbar
        placeholder="Search"
        onChangeText={setQuery}
        value={query}
        onSubmitEditing={() => {
          if (mode == 0) {
            fetchAlbum();
          } else if (mode == 1) {
            fetchTrack();
          } else if (mode == 2) {
            fetchArtist();
          }
        }}
      />
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Chip
          mode={mode == 0 ? "flat" : "outlined"}
          onPress={() => {
            setMode(0);
          }}
        >
          Albums
        </Chip>
        <Chip
          mode={mode == 1 ? "flat" : "outlined"}
          onPress={() => {
            setMode(1);
          }}
        >
          Tracks
        </Chip>
        <Chip
          mode={mode == 2 ? "flat" : "outlined"}
          onPress={() => {
            setMode(2);
          }}
        >
          Artists
        </Chip>
      </View>
      {mode == 0 ? (
        !albumFetching ? (
          <FlatList
            data={albumData?.albumData.albums.items || []}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <MusicCard
                image_url={item.images[0].url}
                title={item.name}
                description={item.artists[0].name}
                onPress={() => {console.log(item)}}
              />
            )}
            contentContainerStyle={{ gap: 8 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        ) : albumFetching ? (
          <ActivityIndicator color={theme.colors.primary} size={48} />
        ) : null
      ) : null}
      {mode == 1 ? (
        !trackFetching ? (
          <FlatList
            data={trackData?.trackData.tracks.items || []}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <MusicCard
                image_url={item.album.images[0].url}
                title={item.name}
                description={item.artists[0].name}
              />
            )}
            contentContainerStyle={{ gap: 8 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        ) : trackFetching ? (
          <ActivityIndicator color={theme.colors.primary} size={48} />
        ) : null
      ) : null}
      {mode === 2 ? (
        artistData?.artistData?.artists?.items ? (
          <FlatList
            data={artistData.artistData.artists.items || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MusicCard title={item.name} image_url={item.images?.[0]?.url} />
            )}
            contentContainerStyle={{ gap: 8 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        ) : artistFetching ? (
          <ActivityIndicator color={theme.colors.primary} size={48} />
        ) : null
      ) : null}
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
