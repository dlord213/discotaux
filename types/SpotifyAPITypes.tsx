export interface SpotifyItemInterface {
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: { url: string; height: number; width: number }[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: { reason: "market" | "product" | "explicit" };
  type: string;
  uri: string;
  artists: {
    external_urls: { spotify: string };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
}

export interface CachedSpotifyDataInterface {
  albumData: {
    albums: {
      href: string;
      items: SpotifyItemInterface[];
      limit: number;
      next?: string;
      offset?: number;
      previous?: string;
      total?: number;
    };
  };
  lastUpdated: string;
}
