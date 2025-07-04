import { useState, useEffect } from "react";
import { useSession } from "@/libs/context/AuthContext";
import getAccessToken from "@/libs/context/getAccessToken";
import { useRouter } from "expo-router";
import ListItem from "@/libs/components/ListItem";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import { fetchSpotifyResource } from "../apiCalls/fetchSpotifyResource";

type TargetType = "playlists" | "tracks";

type ListItemType = {
  id: string;
  name: string;
};

type SpotifyPlaylist = {
  id: string;
  name: string;
};

type SpotifyTrackItem = {
  track: {
    id: string;
    name: string;
  };
};

type SpotifyPlaylistsResponse = {
  items: SpotifyPlaylist[];
  total: number;
};

type SpotifyTracksResponse = {
  items: SpotifyTrackItem[];
  total: number;
};

type SpotifyAPIResponseMap = {
  playlists: SpotifyPlaylistsResponse;
  tracks: SpotifyTracksResponse;
};

function isTrackTarget(target: TargetType): target is "tracks" {
  return target === "tracks";
}

export default function Lists({ target }: { target: TargetType }) {
  const { session, setSession } = useSession();
  const [list, setList] = useState<ListItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const router = useRouter();

  useEffect(() => {
    if (!session) return;
    if (typeof session == "object" && !session.accessToken) {
      router.replace("/");
    }
    fetchList(target);
  }, [session]);

  const fetchList = async <T extends TargetType>(target: T) => {
    const token = getAccessToken(session);
    if (!token || loading || !hasMore) return;

    setLoading(true);
    try {
      const response = fetchSpotifyResource(session, target, offset, limit);

      const data: SpotifyAPIResponseMap[T] = await response;

      let normalizedItems: ListItemType[];

      if (isTrackTarget(target)) {
        normalizedItems = (data as SpotifyTracksResponse).items.map((item) => ({
          id: item.track.id,
          name: item.track.name,
        }));
      } else {
        normalizedItems = (data as SpotifyPlaylistsResponse).items.map(
          (item) => ({
            id: item.id,
            name: item.name,
          }),
        );
      }

      if (
        data.items.length === 0 ||
        list.length + data.items.length >= data.total
      ) {
        setHasMore(false);
      }

      setList((prev) => [...prev, ...normalizedItems]);
      setOffset((prev) => prev + limit);
    } catch (error) {
      console.error(error);
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlatList
      style={styles.list}
      data={list}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ListItem item={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={() => {
        fetchList(target);
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <ActivityIndicator /> : null}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    color: "#ffffff",
    marginLeft: 5,
  },
  separator: {
    height: 3,
    backgroundColor: "#fff",
    marginHorizontal: 15,
    borderRadius: 15,
    maxWidth: "50%",
    opacity: 0.5,
  },
});
