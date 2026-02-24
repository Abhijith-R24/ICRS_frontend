import { loginUser } from "@/.vscode/services/auth";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if fields are empty
    if (!email.trim() || !password.trim()) {
      if (Platform.OS === "web") {
        alert("Please fill all required fields");
      } else {
        Alert.alert("Error", "Please fill all required fields");
      }
      return;
    }

    // Validate email format
    if (!emailPattern.test(email)) {
      if (Platform.OS === "web") {
        alert("Please enter a valid email address");
      } else {
        Alert.alert("Error", "Please enter a valid email address");
      }
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser({
        email,
        password,
      });

      console.log("Login successful:", response.data);

      if (email === "admin@gmail.com") {   // Simple check for admin user
        router.replace("/admin");
      }
      else {
        router.replace("/dashboard");
      }

      setEmail("");
      setPassword("");

      if (Platform.OS === "web") {
        // On web, use window.location for more reliable navigation
        console.log("Web login successful, redirecting to dashboard");
        window.location.href = "/dashboard";
      } else {
        // On mobile, use router
        router.replace("/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      if (Platform.OS === "web") {
        alert(`Login Failed: ${errorMessage}`);
      } else {
        Alert.alert("Login Failed", errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };


  const isFormValid = email.trim() !== "" && password.trim() !== "" && !loading;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password "
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.link}>Don’t have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 10,
    color: "#000000",
    fontFamily: "roboto-700",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    fontWeight: "bold",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    textAlign: "center",
    marginTop: 20,
  },
});
