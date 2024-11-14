import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { CachedSpotifyDataInterface } from "@/types/SpotifyAPITypes";

interface ReleasesStoreInterface {
  CACHE_KEY: string;
  SPOTIFY_TOKEN_KEY: string;
  getNewAlbumReleases: () => Promise<CachedSpotifyDataInterface | undefined>;
  getSpotifyAccessToken: () => Promise<string>;
}

const useReleasesStore = create<ReleasesStoreInterface>()(
  immer((set, get) => ({
    CACHE_KEY: "@releases-albums-data",
    SPOTIFY_TOKEN_KEY: "@spotify-token-key",
    getNewAlbumReleases: async () => {
      const access_token = await get().getSpotifyAccessToken();

      if (access_token) {
        try {
          const cachedAlbumData = await AsyncStorage.getItem(get().CACHE_KEY);
          if (cachedAlbumData) {
            const parsedCachedAlbumData: CachedSpotifyDataInterface =
              JSON.parse(cachedAlbumData);

            return parsedCachedAlbumData;
          }
        } catch (error) {
          console.log("Error:", error);
        }

        try {
          const response = await axios.get<
            CachedSpotifyDataInterface["albumData"]
          >("https://api.spotify.com/v1/browse/new-releases?limit=50", {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          });

          const cachedAlbumData: CachedSpotifyDataInterface = {
            albumData: response.data,
            lastUpdated: new Date().toLocaleDateString(),
          };

          await AsyncStorage.setItem(
            "@releases-albums-data",
            JSON.stringify(cachedAlbumData)
          );

          return cachedAlbumData;
        } catch (err) {
          console.log("Error:", err);
        }
      }
    },
    getSpotifyAccessToken: async () => {
      const CLIENT_ID = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
      const CLIENT_SECRET = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;

      const cachedTokenData = await AsyncStorage.getItem(
        get().SPOTIFY_TOKEN_KEY
      );

      if (cachedTokenData) {
        const { access_token, expires_in, timestamp } =
          JSON.parse(cachedTokenData);
        const tokenExpiryTime =
          new Date(timestamp).getTime() + expires_in * 1000;

        if (tokenExpiryTime < Date.now()) {
          try {
            const spotifyData = await axios.post(
              "https://accounts.spotify.com/api/token",
              {
                grant_type: "client_credentials",
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
              },
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            );

            await AsyncStorage.setItem(
              get().SPOTIFY_TOKEN_KEY,
              JSON.stringify({
                access_token: spotifyData.data["access_token"],
                expires_in: spotifyData.data["expires_in"],
                bearer: spotifyData.data["bearer"],
                timestamp: new Date().toISOString(),
              })
            );

            return spotifyData.data["access_token"];
          } catch (err) {
            console.log("Error:", err);
          }
        } else {
          return access_token;
        }
      } else {
        try {
          const spotifyData = await axios.post(
            "https://accounts.spotify.com/api/token",
            {
              grant_type: "client_credentials",
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET,
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          await AsyncStorage.setItem(
            get().SPOTIFY_TOKEN_KEY,
            JSON.stringify({
              access_token: spotifyData.data["access_token"],
              expires_in: spotifyData.data["expires_in"],
              bearer: spotifyData.data["bearer"],
              timestamp: new Date().toISOString(),
            })
          );

          return spotifyData.data["access_token"];
        } catch (err) {
          console.log("Error:", err);
        }
      }
    },
  }))
);

export default useReleasesStore;
