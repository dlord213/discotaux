import useAuthStore from "@/stores/useAuthStore";
import useReleasesStore from "@/stores/useReleasesStore";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Banner, Icon, Searchbar, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const theme = useTheme();

  const [bannerVisibility, setBannerVisibility] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const { isLoggedIn } = useAuthStore();
  const {} = useReleasesStore();

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
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
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
      <ScrollView
        contentContainerStyle={{ gap: 16 }}
        showsVerticalScrollIndicator={false}
      ></ScrollView>
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
