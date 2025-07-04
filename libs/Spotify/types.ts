export type TargetType = "playlists" | "tracks";

export type ListItemType = {
  id: string;
  name: string;
};

export type SpotifyTrackItem = {
  track: {
    id: string;
    name: string;
  };
};

export type SpotifyPlaylist = {
  id: string;
  name: string;
};

export type SpotifyPlaylistsResponse = {
  items: SpotifyPlaylist[];
  total: number;
};

export type SpotifyTracksResponse = {
  items: SpotifyTrackItem[];
  total: number;
};

export type SpotifyAPIResponseMap = {
  playlists: SpotifyPlaylistsResponse;
  tracks: SpotifyTracksResponse;
};
