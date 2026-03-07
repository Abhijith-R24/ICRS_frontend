import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function LoginScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    router.replace("/dashboard");
  };

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >

      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="security" size={70} color="#fff" />
        <Text style={styles.appTitle}>Crime Connect</Text>
        <Text style={styles.subtitle}>Integrated Crime Reporting System</Text>
      </View>

      {/* Login Card */}
      <View style={styles.card}>

        <Text style={styles.title}>Welcome Back</Text>

        {/* Email */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={22} color="#777" />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={22} color="#777" />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
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

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
  },

  appTitle: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  },

  subtitle: {
    color: "#cbd5e1",
    fontSize: 13,
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 25,
    borderRadius: 20,
    padding: 25,
    elevation: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },

  loginButton: {
    backgroundColor: "#0f172a",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  registerText: {
    marginTop: 20,
    textAlign: "center",
    color: "#555",
  },

  registerLink: {
    color: "#2563eb",
    fontWeight: "bold",
  }

});