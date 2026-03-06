import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* App Logo */}
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/619/619034.png",
        }}
        style={styles.logo}
      />

      {/* App Name */}
      <Text style={styles.title}>Crime Connect</Text>
      <Text style={styles.version}>Version 1.0.0</Text>

      {/* Description */}
      <View style={styles.card}>
        <Text style={styles.heading}>About the App</Text>
        <Text style={styles.text}>
          Crime Connect is a mobile platform designed to help citizens report
          crimes easily and track complaint status in real-time. The system
          connects users directly with authorities, improving transparency and
          response time for emergency and non-emergency incidents.
        </Text>
      </View>

      {/* Features */}
      <View style={styles.card}>
        <Text style={styles.heading}>Key Features</Text>
        <Text style={styles.text}>• Report crimes easily</Text>
        <Text style={styles.text}>• Emergency complaint reporting</Text>
        <Text style={styles.text}>• Track complaint status</Text>
        <Text style={styles.text}>• Admin monitoring system</Text>
      </View>

      {/* Developer Info */}

      {/* Contact */}
      <View style={styles.card}>
        <Text style={styles.heading}>Support</Text>
        <Text style={styles.text}>Email: support@crimeconnect.com</Text>
        <Text style={styles.text}>Phone: +91 XXXXX XXXXX</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 20,
    backgroundColor: "#f4f6f9",
    alignItems: "center"
  },

  logo: {
    width: 100,
    height: 100,
    marginTop: 30,
    marginBottom: 15
  },

  title: {
    fontSize: 24,
    fontWeight: "bold"
  },

  version: {
    color: "#777",
    marginBottom: 20
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    width: "100%",
    marginBottom: 15,
    elevation: 3
  },

  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8
  },

  text: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4
  }

});