import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import {
  Banner,
  Card,
  Icon,
  Searchbar,
  Text,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const theme = useTheme();

  const [bannerVisibility, setBannerVisibility] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const { height: screenHeight, width: screenWidth } = useWindowDimensions();

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
            style={{ borderRadius: theme.roundness }}
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

      <Card mode="contained">
        <Card.Cover
          source={{
            uri: "https://i.redd.it/chromakopia-in-color-v0-5xjvzebnsdwd1.jpg?width=1000&format=pjpg&auto=webp&s=b5417fe28b92eb6e5e6ee3b638c65bcac307e1b2",
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
          <Image
            style={{
              height: screenHeight / 5,
              aspectRatio: 1,
              borderRadius: theme.roundness,
            }}
            src="https://i.redd.it/chromakopia-in-color-v0-5xjvzebnsdwd1.jpg?width=1000&format=pjpg&auto=webp&s=b5417fe28b92eb6e5e6ee3b638c65bcac307e1b2"
          />
          <View>
            <Text
              variant="headlineMedium"
              style={{ color: theme.colors.onBackground, fontWeight: "bold" }}
            >
              CHROMAKOPIA
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
              Chromakopia is the eighth studio album by American rapper Tyler
              the Creator . It was released through Columbia Records on October
              28, 2024, serving as the follow-up to Call Me If You Get Lost
              (2021).
            </Text>
          </View>
        </Card.Content>
      </Card>
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
