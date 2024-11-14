import axios, { AxiosResponse } from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ReleasesStoreInterface {
  getNewAlbumReleases: () => Promise<AxiosResponse<any, any> | undefined>;
}

const useReleasesStore = create<ReleasesStoreInterface>()(
  immer((set, get) => ({
    getNewAlbumReleases: async () => {
      const api_key = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;

      try {
        const albums = await axios.get(
          "https://api.spotify.com/v1/browse/new-releases"
        );

        return albums.data;
      } catch (err) {
        console.log(err);
      }
    },
  }))
);

export default useReleasesStore;
