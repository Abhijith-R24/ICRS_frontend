import React, { useEffect, useState } from "react";
import {View,Text,FlatList,TouchableOpacity,StyleSheet,Alert,ActivityIndicator,
} from "react-native";
import axios from "axios";

export default function AdminScreen() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = ""; //  change IP

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`${API}/complaints`);
      setComplaints(res.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(`${API}/complaints/${id}`, { status });
      fetchComplaints();
    } catch (error) {
      Alert.alert("Error", "Status update failed");
    }
  };

  const deleteComplaint = async (id: string) => {
    Alert.alert("Confirm", "Delete this complaint?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          await axios.delete(`${API}/complaints/${id}`);
          fetchComplaints();
        },
      },
    ]);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>

      <FlatList
        data={complaints}
        keyExtractor={(item: any) => item._id}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text style={styles.bold}>{item.crimeType}</Text>
            <Text>{item.description}</Text>
            <Text>Status: {item.status}</Text>

            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.pending}
                onPress={() => updateStatus(item._id, "Pending")}
              >
                <Text style={styles.buttonText}>Pending</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.progress}
                onPress={() => updateStatus(item._id, "Investigation")}
              >
                <Text style={styles.buttonText}>Investigating</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.resolved}
                onPress={() => updateStatus(item._id, "Resolved")}
              >
                <Text style={styles.buttonText}>Resolved</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.delete}
              onPress={() => deleteComplaint(item._id)}
            >
              <Text style={{ color: "#fff" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f6f9" },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },

  bold: { fontWeight: "bold", fontSize: 16 },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  pending: {
    backgroundColor: "#facc15",
    padding: 8,
    borderRadius: 6,
  },

  progress: {
    backgroundColor: "#3b82f6",
    padding: 8,
    borderRadius: 6,
  },

  resolved: {
    backgroundColor: "#22c55e",
    padding: 8,
    borderRadius: 6,
  },

  delete: {
    backgroundColor: "#ef4444",
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
});