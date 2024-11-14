import useAuthStore from "@/stores/useAuthStore";
import React, { useEffect } from "react";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import {
  Icon,
  Text,
  useTheme,
  SegmentedButtons,
  TextInput,
  Button,
  ActivityIndicator,
  List,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const theme = useTheme();
  const [page, setPage] = useState<string>("login");

  const [accordionExpanded, setExpanded] = useState({
    album: false,
    tracks: false,
    lists: false,
  });

  const {
    form,
    session,
    clearForm,
    setEmailAddress,
    setPassword,
    setUsername,
    handleLogin,
    handleRegister,
    isAuthing,
    isLoggedIn,
  } = useAuthStore();

  useEffect(() => {
    return () => clearForm();
  }, [page]);

  if (isAuthing) {
    <SafeAreaView style={styles.safeAreaView}>
      <ActivityIndicator color={theme.colors.primary} />
    </SafeAreaView>;
  }

  if (!isLoggedIn && !isAuthing) {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.primary, fontWeight: "bold" }}
          >
            NOT LOGGED IN
          </Text>
          <Icon source="cog" size={24} color={theme.colors.onBackground} />
        </View>
        <SegmentedButtons
          value={page}
          onValueChange={setPage}
          buttons={[
            {
              value: "login",
              label: "Login",
            },
            {
              value: "register",
              label: "Register",
            },
          ]}
        />
        {page == "login" ? (
          <>
            <TextInput
              value={form.emailAddress}
              onChangeText={setEmailAddress}
              mode="outlined"
              label="Email address"
            />
            <TextInput
              value={form.password}
              onChangeText={setPassword}
              mode="outlined"
              label="Password"
              secureTextEntry
            />
            <Button mode="contained" onPress={handleLogin}>
              Login
            </Button>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                Forgot your password?
              </Text>
              <Pressable onPress={() => setPage("register")}>
                <Text variant="bodySmall" style={{ color: theme.colors.error }}>
                  Don't have an account?
                </Text>
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <TextInput
              value={form.username}
              onChangeText={setUsername}
              mode="outlined"
              label="Username"
            />
            <TextInput
              value={form.emailAddress}
              onChangeText={setEmailAddress}
              mode="outlined"
              label="Email address"
            />
            <TextInput
              value={form.password}
              onChangeText={setPassword}
              mode="outlined"
              label="Password"
              secureTextEntry
            />
            <Button mode="contained" onPress={handleRegister}>
              Register
            </Button>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                Forgot your password?
              </Text>
              <Pressable onPress={() => setPage("login")}>
                <Text variant="bodySmall" style={{ color: theme.colors.error }}>
                  Already have an account?
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.primary, fontWeight: "bold" }}
        >
          MEMBER SINCE •{" "}
          {new Date(session!.record.created)
            .toLocaleString("en-US", {
              dateStyle: "medium",
            })
            .toUpperCase()}
        </Text>
        <Icon source="cog" size={24} color={theme.colors.onBackground} />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Icon size={128} source="account-circle" />
        <Text variant="headlineMedium">{session?.record.username}</Text>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          gap: 8,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Button
          icon="application-edit-outline"
          mode="outlined"
          onPress={() => console.log("Pressed")}
          style={{ flex: 1 }}
        >
          Edit Profile
        </Button>
        <Button
          icon="share-variant"
          mode="contained"
          onPress={() => console.log("Pressed")}
          style={{ flex: 1 }}
        >
          Edit Profile
        </Button>
      </View>
      <ScrollView>
        <List.Accordion
          title="Album reviews"
          left={(props) => <List.Icon {...props} icon="archive-music" />}
          expanded={accordionExpanded.album}
          onPress={() =>
            setExpanded((prev) => ({
              ...prev,
              album: !prev.album,
            }))
          }
        >
          <List.Item
            title="CHROMAKOPIA"
            description="Tyler, the Creator"
            left={(props) => (
              <List.Image
                style={{ borderRadius: theme.roundness }}
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/en/5/5b/Chromakopia_CD_cover.jpg",
                }}
              />
            )}
          />
        </List.Accordion>
        <List.Accordion
          title="Track reviews"
          left={(props) => <List.Icon {...props} icon="archive-music" />}
          expanded={accordionExpanded.tracks}
          onPress={() =>
            setExpanded((prev) => ({
              ...prev,
              tracks: !prev.tracks,
            }))
          }
        >
          <List.Item
            title="CHROMAKOPIA"
            description="Tyler, the Creator"
            left={(props) => (
              <List.Image
                style={{ borderRadius: theme.roundness }}
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/en/5/5b/Chromakopia_CD_cover.jpg",
                }}
              />
            )}
          />
        </List.Accordion>
        <List.Accordion
          title="Lists"
          left={(props) => <List.Icon {...props} icon="archive-music" />}
          expanded={accordionExpanded.lists}
          onPress={() =>
            setExpanded((prev) => ({
              ...prev,
              lists: !prev.lists,
            }))
          }
        >
          <List.Item
            title="CHROMAKOPIA"
            description="Tyler, the Creator"
            left={(props) => (
              <List.Image
                style={{ borderRadius: theme.roundness }}
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/en/5/5b/Chromakopia_CD_cover.jpg",
                }}
              />
            )}
          />
        </List.Accordion>
      </ScrollView>
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
