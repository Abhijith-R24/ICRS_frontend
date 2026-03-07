import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { router } from "expo-router";

export default function EditProfile() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pan, setPan] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const storedUser = await AsyncStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      setUsername(user.username);
      setEmail(user.email);
      setPhone(user.phone);
      setPan(user.pan);
    }
  };

  const handleSave = async () => {
    const updatedUser = {
      username,
      email,
      phone,
      pan,
    };

    await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

    Alert.alert("Success", "Profile updated successfully");

    router.back();
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Edit Profile</Text>

      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />

      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone"
      />

      <TextInput
        style={styles.input}
        value={pan}
        onChangeText={setPan}
        placeholder="PAN Number"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    backgroundColor:"#f4f6f9"
  },

  title:{
    fontSize:22,
    fontWeight:"bold",
    marginBottom:20
  },

  input:{
    backgroundColor:"#fff",
    padding:15,
    borderRadius:10,
    marginBottom:15,
    elevation:2
  },

  button:{
    backgroundColor:"#000",
    padding:15,
    borderRadius:10,
    alignItems:"center"
  },

  buttonText:{
    color:"#fff",
    fontWeight:"bold"
  }

});