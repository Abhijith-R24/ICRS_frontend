import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Link,router } from 'expo-router';
import React, { useState } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
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

    // If everything is valid → Navigate
    router.replace("/dashboard");


    setEmail("");
    setPassword("");
       

  };
   const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!!</Text>

      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address"  autoCapitalize= "none" value={email} onChangeText={setEmail} />

      <TextInput style={styles.input} placeholder="Password " secureTextEntry  value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button}onPress={handleSubmit}  disabled={!isFormValid}>

        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
  
    <TouchableOpacity onPress={()=> router.push("/register")}>
        <Text style={styles.link}>
        Don’t have an account? Register
        </Text>
      </TouchableOpacity>

</View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 10,
    color: '#000000',
    fontFamily: 'roboto-700',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    fontWeight:"bold",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    textAlign: 'center',
    marginTop: 20,
  },
});