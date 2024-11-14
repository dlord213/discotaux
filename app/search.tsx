import useSearchStore from "@/stores/useSearchStore";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Chip, Searchbar, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const theme = useTheme();

  const { query, setQuery, mode, setMode } = useSearchStore();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Searchbar placeholder="Search" onChangeText={setQuery} value={query} />
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
          User
        </Chip>
      </View>
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
