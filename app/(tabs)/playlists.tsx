import { useSession } from "@/libs/context/AuthContext";
import getAccessToken from "@/libs/context/getAccessToken";
import { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";

type Playlist = {
  id: string;
  name: string;
};

export default function Playlists() {
  const { session } = useSession();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
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
    <View>
      <Text>Existing Playlists</Text>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        onEndReached={() => {
          fetchPlaylists();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </View>
  );
}
