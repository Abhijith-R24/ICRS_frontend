
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function LoginScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    router.replace("/dashboard");
  };

  return (

    <LinearGradient
      colors={["#1e3a8a", "#0f172a", "#020617"]}
      style={styles.container}
    >

      <StatusBar barStyle="light-content" />

      {/* Title Section */}
      <View style={styles.topSection}>
        <MaterialIcons name="security" size={70} color="#fff" />
        <Text style={styles.appName}>Crime Connect</Text>
        <Text style={styles.tagline}>Report. Track. Stay Safe.</Text>
      </View>

      {/* Login Card */}
      <View style={styles.card}>

        <Text style={styles.title}>Welcome Back</Text>

        {/* Email */}
        <View style={styles.inputBox}>
          <MaterialIcons name="email" size={22} color="#555" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#777"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password */}
        <View style={styles.inputBox}>
          <MaterialIcons name="lock" size={22} color="#555" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#777"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Register */}
        <Text style={styles.registerText}>
          Don't have an account?{" "}
          <Text
            style={styles.registerLink}
            onPress={() => router.push("/register")}
          >
            Register
          </Text>
        </Text>

      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"center",
    padding:25
  },

  topSection:{
    alignItems:"center",
    marginBottom:40
  },

  appName:{
    fontSize:28,
    fontWeight:"bold",
    color:"#fff",
    marginTop:10
  },

  tagline:{
    color:"#cbd5e1",
    marginTop:5
  },

  card:{
    backgroundColor:"rgba(255,255,255,0.95)",
    padding:25,
    borderRadius:20,
    elevation:10
  },

  title:{
    fontSize:22,
    fontWeight:"bold",
    marginBottom:20,
    textAlign:"center"
  },

  inputBox:{
    flexDirection:"row",
    alignItems:"center",
    borderWidth:1,
    borderColor:"#ddd",
    borderRadius:12,
    paddingHorizontal:12,
    marginBottom:15
  },

  input:{
    flex:1,
    padding:12,
    fontSize:16
  },

  button:{
    backgroundColor:"#1e3a8a",
    padding:15,
    borderRadius:12,
    alignItems:"center",
    marginTop:10
  },

  buttonText:{
    color:"#fff",
    fontSize:16,
    fontWeight:"bold"
  },

  registerText:{
    textAlign:"center",
    marginTop:18,
    color:"#555"
  },

  registerLink:{
    color:"#2563eb",
    fontWeight:"bold"
  }

});