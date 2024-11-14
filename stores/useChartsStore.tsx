import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import axios, { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ChartsStoreInterface {
  CACHE_KEY: string;
  getTopTracks: () => Promise<
    | {
        trackName: any;
        artistName: any;
        details: any;
      }[]
    | undefined
  >;
}

const useChartsStore = create<ChartsStoreInterface>()(
  immer((set, get) => ({
    CACHE_KEY: "@chart-tracks-data",
    errorMessage: "",
    getTopTracks: async () => {
      const api_key = process.env.EXPO_PUBLIC_LAST_FM_API_KEY;

      const delay = (ms: any) =>
        new Promise((resolve) => setTimeout(resolve, ms));
      const trackDetails = [];

      try {
        const cachedTrackData = await AsyncStorage.getItem(get().CACHE_KEY);
        if (cachedTrackData) {
          const parsedCachedTrackData = JSON.parse(cachedTrackData);

          return parsedCachedTrackData.trackDetails;
        }
      } catch (error) {
        console.log("Error:", error);
      }

      try {
        const topTracks = await axios.get(
          `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${api_key}&format=json`
        );

        const trackInfo = topTracks.data.tracks.track.map((track: any) => ({
          trackName: track.name,
          artistName: track.artist.name,
        }));

        for (const { trackName, artistName } of trackInfo) {
          const encodedArtist = encodeURIComponent(artistName);
          const encodedTrack = encodeURIComponent(trackName);
          const url = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${api_key}&artist=${encodedArtist}&track=${encodedTrack}&format=json`;

          try {
            const response = await axios.get(url);
            trackDetails.push({
              trackName,
              artistName,
              details: response.data,
            });
            await delay(50);
          } catch (error) {
            console.error(
              `Error fetching details for ${trackName} by ${artistName}:`,
              error
            );
          }
        }

        const chartTracksData = {
          trackDetails: trackDetails,
          lastUpdated: new Date().toLocaleDateString("en-US"),
        };

        await AsyncStorage.setItem(
          "@chart-tracks-data",
          JSON.stringify(chartTracksData)
        );

        return trackDetails;
      } catch (error) {
        console.error("Error fetching top tracks:", error);
        set({ errorMessage: error });
      }
    },
  }))
);

export default useChartsStore;
