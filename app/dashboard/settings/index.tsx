import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Settings() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/dashboard/settings/profile")}
      >
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/dashboard/settings/logout")}
      >
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },

  card: {
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 15,
  },

  text: { fontSize: 18 },
});