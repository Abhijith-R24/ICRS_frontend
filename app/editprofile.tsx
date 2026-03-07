import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function EditProfileScreen() {

  const [fullName, setFullName] = useState("Arya Lakshmi");
  const [email, setEmail] = useState("arya@email.com");
  const [phone, setPhone] = useState("9876543210");
  const [address, setAddress] = useState("Trikkandiyur, Kerala");

  const handleUpdate = () => {
    Alert.alert("Success", "Profile updated successfully!");
    
    // Here you can call your API
    // updateProfile({fullName,email,phone,address})
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>Edit Profile</Text>

      {/* Full Name */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="person" size={22} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={22} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Phone */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="phone" size={22} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          keyboardType="numeric"
          onChangeText={setPhone}
        />
      </View>

      {/* Address */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="location-on" size={22} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center"
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333"
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16
  },

  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }

});