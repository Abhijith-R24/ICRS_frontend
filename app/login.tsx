import { loginUser } from "@/.vscode/services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    await AsyncStorage.clear(); // ✅ add this temporarily to clear old data
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if fields are empty
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    // Validate email format
    if (!emailPattern.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }


    try {
      setLoading(true);
      const response = await loginUser({
        email: email.trim(),
        password,
      });

      console.log("Login success", response.data);
      const isAdmin = response?.data?.isAdmin 
      const userData = response.data;
      await AsyncStorage.setItem("user",JSON.stringify({
        username:userData?.username,
        email:userData?.email,
        phone:userData?.phone,
        pan:userData?.pan,
        userId:userData?.userId,
        isAdmin:userData?.isAdmin,
      }));
      setEmail("");
      setPassword("");
      if (isAdmin) {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";

      Alert.alert("Login Failed", msg);
    } finally {
      setLoading(false);
    }
  };
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password "
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, (!isFormValid || loading) && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={!isFormValid || loading}
      >
        {loading ? (
          <Text style={styles.buttonText}>Loginging in..</Text>
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
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
  buttonDisabled: {},
  link: {
    textAlign: "center",
    marginTop: 20,
  },
});
