import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";

export default function Logout() {
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel" },
      {
        text: "Logout",
        onPress: () => router.replace("/login"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logout</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.text}>Confirm Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },

  button: {
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 10,
  },

  text: { color: "#fff", textAlign: "center", fontSize: 18 },
});