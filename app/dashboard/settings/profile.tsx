import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { router } from "expo-router";

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

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
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

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: "https://i.pinimg.com/236x/c4/c2/34/c4c23420aa097fcb949a3011eddeab3b.jpg " }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.username || "User"}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* User Info Cards */}
      <View style={styles.card}>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{user?.phone || "Not Available"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>PAN Number</Text>
        <Text style={styles.value}>{user?.pan || "Not Available"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>User ID</Text>
        <Text style={styles.value}>{user?.userId || "N/A"}</Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.editButton}
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.text}>Confirm Logout</Text>
            </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#f4f6f9",
    padding:20
  },

  profileHeader:{
    alignItems:"center",
    marginBottom:25
  },

  avatar:{
    width:110,
    height:110,
    borderRadius:55,
    marginBottom:10
  },

  name:{
    fontSize:22,
    fontWeight:"bold"
  },

  email:{
    fontSize:14,
    color:"#777"
  },

  card:{
    backgroundColor:"#fff",
    padding:18,
    borderRadius:12,
    marginBottom:15,
    elevation:3
  },

  label:{
    fontSize:12,
    color:"#888"
  },

  value:{
    fontSize:16,
    fontWeight:"bold",
    marginTop:4
  },

  editButton:{
    backgroundColor:"#000",
    padding:15,
    borderRadius:10,
    alignItems:"center",
    marginTop:10,
    marginBottom:10
  },

  editText:{
    color:"#fff",
    fontWeight:"bold"
  },

  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  button: {
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

});