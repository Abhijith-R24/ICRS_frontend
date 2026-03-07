import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.log("Error loading user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel" },
      {
        text: "Logout",
        onPress: async () => {
          await AsyncStorage.removeItem("user");
          router.replace("/login");
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://i.pinimg.com/236x/c4/c2/34/c4c23420aa097fcb949a3011eddeab3b.jpg",
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>{user?.username || "User"}</Text>
        <Text style={styles.email}>{user?.email || "No Email"}</Text>
      </View>

      {/* Info Section */}
      <View style={styles.card}>

        <View style={styles.row}>
          <MaterialIcons name="phone" size={22} color="#555" />
          <View style={styles.info}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{user?.phone || "Not Available"}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <MaterialIcons name="credit-card" size={22} color="#555" />
          <View style={styles.info}>
            <Text style={styles.label}>PAN Number</Text>
            <Text style={styles.value}>{user?.pan || "Not Available"}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <MaterialIcons name="badge" size={22} color="#555" />
          <View style={styles.info}>
            <Text style={styles.label}>User ID</Text>
            <Text style={styles.value}>{user?.userId || "N/A"}</Text>
          </View>
        </View>

      </View>

      {/* Edit Profile */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => router.push("/editProfile")}
      >
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
  },

  header: {
    backgroundColor: "#000",
    alignItems: "center",
    padding: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },

  email: {
    fontSize: 14,
    color: "#ddd",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 15,
    padding: 18,
    elevation: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  info: {
    marginLeft: 12,
  },

  label: {
    fontSize: 12,
    color: "#888",
  },

  value: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 2,
  },

  editButton: {
    backgroundColor: "#000",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  editText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  logoutButton: {
    backgroundColor: "#ff4d4d",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 40,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

});