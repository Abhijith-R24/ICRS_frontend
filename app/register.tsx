import { registerUser } from "@/.vscode/services/auth";
import { router } from "expo-router";
import { useState } from "react";
import {Alert,StyleSheet,Text,TextInput,TouchableOpacity,View} from "react-native";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    if (
      !fullName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !phone.trim()
    ) {
        Alert.alert("Error", "Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
 
        Alert.alert("Error", "Passwords do not match");
      
      return;
    }
    if (phone.trim().length !== 10) {
        Alert.alert("Invalid phone number");
      return;
    }

    setLoading(true);
    try {
      const response = await registerUser({
        username: fullName,
        email,
        password,
        phone: "+91" + phone,
      });
      const role = response?.data?.user?.role || "user";

      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhone("");

        // On mobile, use Alert.alert with button callback
        Alert.alert("Success", "Registered successfully!", [
          {
            text: "OK",
            onPress: () => {
              if(role === "admin"){
                router.replace("/admin");
              }else{
                router.replace("/dashboard");
              }
            },
          },
        ]);
    } catch (error: any) {
     

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
        Alert.alert("Registration Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const isFormValid =
    fullName.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    phone.trim() !== "" &&
    phone.trim().length === 10 &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword &&
    !loading;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#999"
        keyboardType="default"
        value={fullName}
        onChangeText={setFullName}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <View style={styles.phoneRow}>
        <Text style={styles.countryCode}>+91</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder="Phone Number"
          placeholderTextColor="#999"
          keyboardType="numeric"
          maxLength={10}
          value={phone}
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, "").slice(0, 10);
            setPhone(numericText);
          }}
        />
      </View>
      <View style={styles.errorContainer}>
        {phone.trim().length > 0 && phone.trim().length < 10 && (
          <Text style={styles.errorText}>
            Enter valid 10 digit phone number
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>
          {loading ? "Registering..." : "Register"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
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
    fontSize: 26,
    textAlign: "center",
    marginBottom: 25,
    color: "#000000",
    fontWeight: "bold",
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
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#000000",
  },
  phoneRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    alignItems: "center",
    borderWidth: 1,
    height: 50,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    marginBottom: 15,
    fontWeight: "bold",
  },
  countryCode: {
    fontSize: 16,
    marginRight: 10,
    color: "#000",
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 5,
    fontWeight: "bold",
  },
  errorContainer: {
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "left",
  },
  buttonDisabled :{
    opacity: 0.5,
    cursor: "not-allowed" as any
    
  }
});
