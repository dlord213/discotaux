import { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
        Charts
      </Text>
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
