export interface SpotifyAlbumInterface {
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

export interface SpotifyArtistInterface {
  external_urls: { spotify: string };
  genres: string[];
  href: string;
  id: string;
  images: { url: string; height: number; width: number }[];
  name: string;
  type: string;
  uri: string;
}

export interface SpotifyTrackInterface {
  album: SpotifyAlbumInterface;
  artists: SpotifyArtistInterface[];
  available_markets: string[];
  explicit: boolean;
  external_urls: { spotify: string };
  name: string;
  track_number: string;
  type: string;
  uri: string;
}

export interface SpotifyAlbumDataInterface {
  albumData: {
    albums: {
      href: string;
      limit: number;
      next?: string;
      offset?: number;
      previous?: string;
      total?: number;
      items: SpotifyAlbumInterface[];
    };
  };
  lastUpdated?: string;
  lastQueryTimestamp?: string;
}

export interface SpotifyArtistDataInterface {
  artistData: {
    artists: {
      href: string;
      limit: number;
      next?: string;
      offset?: number;
      previous?: string;
      total?: number;
      items: SpotifyArtistInterface[];
    };
  };
  lastUpdated?: string;
  lastQueryTimestamp?: string;
}

export interface SpotifyTrackDataInterface {
  trackData: {
    tracks: {
      href: string;
      limit: number;
      next?: string;
      offset?: number;
      previous?: string;
      total?: number;
      items: SpotifyTrackInterface[];
    };
  };
  lastUpdated?: string;
  lastQueryTimestamp?: string;
}
