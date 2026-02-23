import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Video, ResizeMode } from "expo-av";
import { submitComplaint } from "@/.vscode/services/complaint";

export default function ComplaintScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [crimeType, setCrimeType] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(""); // YYYY-MM-DD format
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [documents, setDocuments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prev) => [...prev, result.assets[0].uri]);
    }
  };

  // 🎥 Pick Video
  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });

    if (!result.canceled) {
      setVideos((prev) => [...prev, result.assets[0].uri]);
    }
  };

  // 📄 Pick Document
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync();

    if (result.assets && result.assets.length > 0) {
      setDocuments((prev) => [...prev, result.assets[0].uri]);
    }
  };

  const handleSubmit = async () => {
    // Validate all fields
    if (!name || !phone || !location || !description || !date) {
      if (Platform.OS === "web") {
        alert("Please fill all required fields");
      } else {
        Alert.alert("Error", "Please fill all required fields");
      }
      return;
    }

    // Validate phone length
    if (phone.length !== 10) {
      if (Platform.OS === "web") {
        alert("Phone number must be 10 digits");
      } else {
        Alert.alert("Error", "Phone number must be 10 digits");
      }
      return;
    }

    setLoading(true);
    try {
      const response = await submitComplaint({
        username: name,
        phone: "+91" + phone,
        crimeType,
        description,
        location,
        date,
        evidence: {
          images,
          videos,
          documents,
        },
      });

      console.log("Complaint submitted:", response.data);

      // Clear form
      setName("");
      setPhone("");
      setLocation("");
      setDescription("");
      setDate(new Date().toISOString().split("T")[0]); // Reset to today
      setImages([]);
      setVideos([]);
      setDocuments([]);

      if (Platform.OS === "web") {
        // On web, navigate using router.push then window.location as fallback
        console.log("Web complaint submitted, redirecting to status");
        router.replace("/status");
      } else {
        // On mobile, use Alert with callback
        Alert.alert("Success", "Complaint Registered Successfully", [
          {
            text: "OK",
            onPress: () => router.replace("/status"),
          },
        ]);
      }
    } catch (error: any) {
      console.error("Complaint submission error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      if (Platform.OS === "web") {
        alert(`Error: ${errorMessage}`);
      } else {
        Alert.alert("Error", errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Register Complaint</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
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
              const numericText = text.replace(/[^0-9]/g, "").slice(0, 10); // Remove non-numeric characters and limit to 10 digits
              setPhone(numericText);
            }}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor="#999"
          value={location}
          onChangeText={setLocation}
        />

        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          placeholderTextColor="#999"
          value={date}
          onChangeText={setDate}
        />

        <Text style={styles.label}>Select Crime Type</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            style={styles.Picker}
            selectedValue={crimeType}
            onValueChange={(itemValue) => setCrimeType(itemValue)}
            dropdownIconColor="#000"
          >
            <Picker.Item
              label="Select crime type..."
              value=""
              enabled={false}
              color="#999"
            />
            <Picker.Item label="Theft" value="Theft" />
            <Picker.Item label="Cyber Crime" value="Cyber Crime" />
            <Picker.Item label="Harassment" value="Harassment" />
            <Picker.Item label="Assault" value="Assault" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>
        <Text style={styles.label}>Describe the Incident</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter detailed description (max 500 characters)"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
          maxLength={500}
        />
        <Text style={styles.charCount}>{description.length}/500</Text>
        <View style={styles.evidenceCard}>
          <Text style={styles.sectionTitle}>Upload evidence</Text>
          <Text style={styles.sectionSubtitle}>
            Add photos, videos, or documents to support your complaint.
          </Text>

          <View style={styles.actionRow}>
            <Pressable style={styles.actionButton} onPress={pickImage}>
              <Text style={styles.actionText}>📷 Photo</Text>
            </Pressable>

            <Pressable style={styles.actionButton} onPress={pickVideo}>
              <Text style={styles.actionText}>🎥 Video</Text>
            </Pressable>

            <Pressable style={styles.actionButton} onPress={pickDocument}>
              <Text style={styles.actionText}>📄 File</Text>
            </Pressable>
          </View>

          {/* Image previews */}
          <View style={styles.previewGrid}>
            {images.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.previewImage} />
            ))}
          </View>

          {/* Videos */}
          {videos.map((uri, index) => (
            <Video
              key={index}
              source={{ uri }}
              style={styles.video}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
            />
          ))}

          {/* Documents */}
          {documents.map((uri, index) => (
            <Text key={index} style={styles.documentItem}>
              📄 {uri.split("/").pop()}
            </Text>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Submitting..." : "Submit Complaint"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
  },

  scrollContainer: {
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
    color: "#000000",
    textAlign: "center",
  },

  input: {
    backgroundColor: "#fff",
    padding: 15,
    fontWeight: "bold",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },

  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 1,
    height: 50,
    overflow: "hidden",
    justifyContent: "center",
  },
  Picker: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    color: "#000",
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  charCount: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
    marginBottom: 15,
    marginTop: -10,
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#0f1627",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
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
  },
  countryCode: {
    fontSize: 16,
    marginRight: 10,
    color: "#000",
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 10,
  },
  evidenceCard: {
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginTop: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    backgroundColor: "#111827",
    borderRadius: 8,
    alignItems: "center",
  },
  actionText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  previewGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  previewImage: {
    width: "30%",
    height: 90,
    borderRadius: 8,
  },
  documentItem: {
    marginTop: 8,
    fontSize: 14,
  },
  video: {
    width: "100%",
    height: 220,
    marginTop: 12,
    borderRadius: 8,
    backgroundColor: "#000",
  },
});
