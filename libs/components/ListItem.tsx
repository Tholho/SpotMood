import { View, Text, StyleSheet } from "react-native";

type ListItemProps<T extends { name: string }> = {
  item: T;
};

export default function ListItem<T extends { name: string }>({
  item,
}: ListItemProps<T>) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.textName}>{item.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    margin: 0,
    padding: 20,
  },
  textName: {
    fontSize: 20,
    color: "white",
  },
});
