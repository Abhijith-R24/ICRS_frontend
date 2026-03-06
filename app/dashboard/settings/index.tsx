import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Settings() {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
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
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText} onPress={() => router.push("/about")}>About App</Text>
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
  option:{
    backgroundColor:"#fff",
    borderRadius:15,
    marginBottom:15,
    elevation:2,
    padding:15,
    
  },
  optionText:{
    fontSize:16,
    fontWeight:"bold",
    color:"#000"
  }
});