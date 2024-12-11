import {
  SpotifyAlbumTracksDataInterface,
  SpotifyGetAlbumDataInterface,
} from "@/types/SpotifyAPITypes";
import axios from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface AlbumStoreInterface {
  getAlbumData: (
    id: string,
    token: string
  ) => Promise<SpotifyGetAlbumDataInterface>;
  formatTime: (ms: number) => string;
}

const useAlbumStore = create<AlbumStoreInterface>()(
  immer((set, get) => ({
    getAlbumData: async (id: string, token: string) => {
      try {
        const albumDataResponse =
          await axios.get<SpotifyGetAlbumDataInterface>(
            "https://api.spotify.com/v1/albums/" + id,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );

        return albumDataResponse.data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    formatTime: (ms: number) => {
      const totalSeconds = Math.floor(ms / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    },
  }))
);

export default useAlbumStore;
