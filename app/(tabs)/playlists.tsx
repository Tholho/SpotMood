import { useSession } from "@/libs/context/AuthContext";
import getAccessToken from "@/libs/context/getAccessToken";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";
import ListItem from "@/libs/components/ListItem";

type PlaylistItem = {
  id: string;
  name: string;
};

//Need to manage error 401 flow
export default function Playlists() {
  const { session } = useSession();
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    if (!session) return;
    fetchPlaylists();
  }, [session]);

  const fetchPlaylists = async () => {
    const token = getAccessToken(session);
    if (!token || loading || !hasMore) return;

    setLoading(true);
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      });
      const response = await fetch(
        `https://api.spotify.com/v1/me/playlists?${params.toString()}`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        },
      );
      const data = await response.json();
      if (
        data.items.length === 0 ||
        playlists.length + data.items.length >= data.total
      ) {
        setHasMore(false);
      }
      setPlaylists((prev) => [...prev, ...data.items]);
      setOffset((prev) => prev + limit);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.page}>
      <LinearGradient
        colors={["#0b0024", "#210466"]}
        start={{
          x: 0,
          y: 0.5,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.page}
      />
      <Text>Existing Playlists</Text>
      <FlatList
        style={styles.list}
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListItem item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReached={() => {
          fetchPlaylists();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  list: {
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

function PlayListItem(item: PlaylistItem) {
  return <Pressable></Pressable>;
}
