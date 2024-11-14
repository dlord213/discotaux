import { Pressable, useWindowDimensions, View } from "react-native";
import { Card, useTheme, Text } from "react-native-paper";
import { Image } from "react-native";

interface ReleaseCardProps {
  image_url: string;
  title: string;
  description?: string | null;
}

export default function MusicCard({
  image_url,
  title,
  description,
}: ReleaseCardProps) {
  const theme = useTheme();
  const { height: screenHeight } = useWindowDimensions();

  if (!image_url) {
    return null;
  }

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      <Card mode="contained">
        <Card.Cover
          source={{
            uri: image_url || "",
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
            src={image_url}
          />
          <View>
            <Text
              variant="headlineMedium"
              style={{ color: theme.colors.onBackground, fontWeight: "bold" }}
            >
              {title}
            </Text>
            {description ? (
              <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                {description}
              </Text>
            ) : null}
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
}
