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

export interface SpotifySimplifiedAlbumObjectInterface {
  album_type: string;
  total_tracks: number;
  duration_ms: number;
  available_markets: string[];
  external_urls: { spotify: string };
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
}

export interface SpotifyTrackObject {
  album: {
    album_type: "album" | "single" | "compilation";
    total_tracks: number;
    available_markets: string[];
    external_urls: { spotify: string };
    href: string;
    id: string;
    images: SpotifyImageObject[];
    name: string;
    release_date: string;
    release_date_precision: "year" | "month" | "day";
    type: "album";
    uri: string;
    artists: SpotifySimplifiedArtistObjectInterface[];
  };
  artists: SpotifySimplifiedArtistObjectInterface[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  href: string;
  id: string;
  name: string;
  track_number: number;
  type: "track";
  uri: string;
}

export interface SpotifyArtistObject {
  followers: { href: string; total: number };
  genres: string[]
  href: string
  id: string
  images: SpotifyImageObject[]
  name: string
  popularity: number
  type: "artist"
  uri: string
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

export interface SpotifyNewReleasesInterface {
  albums: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: SpotifySimplifiedAlbumObjectInterface[];
  };
}

export interface SpotifySearchAlbumInterface {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: SpotifySimplifiedAlbumObjectInterface[];
}

export interface SpotifySearchTracksInterface {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: SpotifyTrackObject[];
}

export interface SpotifySearchArtistsInterface {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: SpotifyArtistObject[];
}
