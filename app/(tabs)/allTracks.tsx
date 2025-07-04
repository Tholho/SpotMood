import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { fetchAllSpotifyTracks } from "@/libs/Spotify/utils/getAllLikedTracks";
import { useSession } from "@/libs/context/AuthContext";
import ListItem from "@/libs/components/ListItem";

export default function AllTracks() {
  const { session } = useSession();
  const [tracks, setTracks] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    const fetchData = async () => {
      try {
        const allTracks = await fetchAllSpotifyTracks(session);
        const simplified = allTracks.map((item) => ({
          id: item.track.id,
          name: item.track.name,
        }));
        setTracks(simplified);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0b0024", "#210466"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        style={styles.page}
      />

      <Text style={styles.text}>Liked tracks</Text>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          style={styles.list}
          data={tracks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ListItem item={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  text: {
    color: "#ffffff",
    marginTop: 40,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
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
