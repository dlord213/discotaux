import {
  SpotifyAlbumDataInterface,
  SpotifyArtistDataInterface,
  SpotifyTrackDataInterface,
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
  ) => Promise<SpotifyAlbumDataInterface | undefined> | Promise<unknown>;
  searchTrack: (
    access_token: string
  ) => Promise<SpotifyTrackDataInterface | undefined> | Promise<unknown>;
  searchArtist: (
    access_token: string
  ) => Promise<SpotifyArtistDataInterface | undefined> | Promise<unknown>;
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
          const response = await axios.get<
            SpotifyAlbumDataInterface["albumData"]
          >(`https://api.spotify.com/v1/search?q=${get().query}&type=album`, {
            headers: { Authorization: "Bearer " + access_token },
          });

          const albumData: SpotifyAlbumDataInterface = {
            albumData: response.data,
            lastQueryTimestamp: new Date().toLocaleDateString(),
          };

          return albumData;
        } catch (err) {
          return err;
        }
      }
    },
    searchTrack: async (access_token: string) => {
      if (get().mode == 1) {
        try {
          const response = await axios.get<
            SpotifyTrackDataInterface["trackData"]
          >(`https://api.spotify.com/v1/search?q=${get().query}&type=track`, {
            headers: { Authorization: "Bearer " + access_token },
          });

          const trackData: SpotifyTrackDataInterface = {
            trackData: response.data,
            lastQueryTimestamp: new Date().toLocaleDateString(),
          };

          return trackData;
        } catch (err) {
          return err;
        }
      }
    },
    searchArtist: async (access_token: string) => {
      if (get().mode == 2) {
        try {
          const response = await axios.get<
            SpotifyArtistDataInterface["artistData"]
          >(`https://api.spotify.com/v1/search?q=${get().query}&type=artist`, {
            headers: { Authorization: "Bearer " + access_token },
          });

          const artistData: SpotifyArtistDataInterface = {
            artistData: response.data,
            lastQueryTimestamp: new Date().toLocaleDateString(),
          };

          return artistData;
        } catch (err) {
          return err;
        }
      }
    },
  }))
);

export default useSearchStore;
