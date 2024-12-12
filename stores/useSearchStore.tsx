import {
  SpotifySearchAlbumInterface,
  SpotifySearchArtistsInterface,
  SpotifySearchTracksInterface,
} from "@/types/SpotifyAPITypes";
import axios from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface SearchStoreInterface {
  query: string;
  mode: number; // 0 - Album | 1 - Track | 2 - Artists | 3 - User
  setQuery: (val: string) => void;
  setMode: (val: number) => void;
  searchAlbum: (
    access_token: string
  ) => Promise<SpotifySearchAlbumInterface | undefined>;
  searchTrack: (
    access_token: string
  ) => Promise<SpotifySearchTracksInterface | undefined>;
  searchArtist: (
    access_token: string
  ) => Promise<SpotifySearchArtistsInterface | undefined>;
}

const useSearchStore = create<SearchStoreInterface>()(
  immer((set, get) => ({
    query: "",
    mode: 0,
    setQuery: (val: string) => set({ query: val }),
    setMode: (val: number) => set({ mode: val }),
    searchAlbum: async (access_token: string) => {
      if (get().mode == 0) {
        try {
          const response = await axios.get<SpotifySearchAlbumInterface>(
            `https://api.spotify.com/v1/search?q=${get().query}&type=album`,
            {
              headers: { Authorization: "Bearer " + access_token },
            }
          );

          const albumData: SpotifySearchAlbumInterface = response.data;

          return albumData;
        } catch (err) {
          throw err;
        }
      }
    },
    searchTrack: async (access_token: string) => {
      if (get().mode == 1) {
        try {
          const response = await axios.get<SpotifySearchTracksInterface>(
            `https://api.spotify.com/v1/search?q=${get().query}&type=track`,
            {
              headers: { Authorization: "Bearer " + access_token },
            }
          );

          const trackData: SpotifySearchTracksInterface = response.data;

          return trackData;
        } catch (err) {
          throw err;
        }
      }
    },
    searchArtist: async (access_token: string) => {
      if (get().mode == 2) {
        try {
          const response = await axios.get<SpotifySearchArtistsInterface>(
            `https://api.spotify.com/v1/search?q=${get().query}&type=artist`,
            {
              headers: { Authorization: "Bearer " + access_token },
            }
          );

          const artistData: SpotifySearchArtistsInterface = response.data;

          return artistData;
        } catch (err) {
          throw err;
        }
      }
    },
  }))
);

export default useSearchStore;
