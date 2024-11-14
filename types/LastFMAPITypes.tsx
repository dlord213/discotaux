export interface Wiki {
  published: string;
  summary: string;
  content: string;
}

export interface Image {
  text: string;
  size: string;
}

export interface Artist {
  name: string;
  mbid: string;
  url: string;
}

export interface Album {
  artist: string;
  title: string;
  url: string;
  image: Image[];
}

export interface ChartTrack {
  // method=chart.gettoptracks
  name: string;
  duration: string;
  playcount: string;
  listeners: string;
  mbid: string;
  url: string;
  artist: Artist;
  image: Image[];
}

export interface TrackInfo {
  // method=track.getInfo
  name: string;
  url: string;
  duration: string;
  listeners: string;
  playcount: string;
  artist: Artist;
  album: Album;
  wiki: Wiki;
}
