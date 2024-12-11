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

export interface SpotifyImageObject {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyGetAlbumDataInterface {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: object;
  href: string;
  id: string;
  images: SpotifyImageObject[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: { reason: string };
  type: string;
  uri: string;
  artists: SpotifySimplifiedArtistObjectInterface[];
  tracks: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: SpotifySimplifiedTrackObjectInterface[];
  };
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

export interface SpotifySimplifiedArtistObjectInterface {
  external_urls: object;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface SpotifySimplifiedTrackObjectInterface {
  artists: SpotifySimplifiedArtistObjectInterface[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: object;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: object;
  restrictions: object;
  name: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface SpotifyAlbumTracksDataInterface {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: SpotifySimplifiedTrackObjectInterface[];
}
