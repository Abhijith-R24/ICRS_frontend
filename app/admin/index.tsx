import {
  getAllComplaints,
  updateComplaintStatus,
} from "@/.vscode/services/admin";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
export default function AdminScreen() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch complaints
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await getAllComplaints();
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.complaints || [];
      const sorted = [...data].sort(
        (a: any, b: any) => (b.isEmergency ? 1 : 0) - (a.isEmergency ? 1 : 0),
      );

      setComplaints(sorted);
    } catch (error: any) {
      console.log("Error FULL:", error);
      console.log("ERROR DATA:", error?.response?.data);
      console.log("ERROR STATUS:", error?.response?.status);
      Alert.alert("Error", "Failed to fetch complaints");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    fetchComplaints();
  };

  // Update status
  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await updateComplaintStatus(id, status);

      Alert.alert("Success", `Marked as ${status}`);

      fetchComplaints(); // refresh
    } catch (error) {
      console.log("Update error:", error);
      Alert.alert("Error", "Failed to update status");
    }
  };

  // Render each complaint
  const renderItem = ({ item }: any) => (
    <View style={[styles.card, item.isEmergency && styles.emergencyCard]}>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{item.reportedBy}</Text>

      <Text style={styles.label}>Crime:</Text>
      <Text style={styles.value}>{item.crimeType}</Text>

      <Text style={styles.label}>Location:</Text>
      <Text style={styles.value}>{item.location}</Text>

      <Text style={styles.label}>Status:</Text>
      <Text style={styles.status}>{item.status}</Text>
      {item.isEmergency && (
        <Text style={styles.emergencyBadge}>🚨 EMERGENCY</Text>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.approveBtn}
          onPress={() => handleUpdateStatus(item._id, "Approved")}
        >
          <Text style={styles.btnText}>Approve</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rejectBtn}
          onPress={() => handleUpdateStatus(item._id, "Rejected")}
        >
          <Text style={styles.btnText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Loading
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading complaints...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <FlatList
        data={complaints}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f6f9",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },

  label: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },

  value: {
    fontSize: 15,
    fontWeight: "bold",
  },

  status: {
    fontSize: 14,
    fontWeight: "bold",
    color: "blue",
    marginTop: 5,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  approveBtn: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 8,
    width: "48%",
  },

  rejectBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    width: "48%",
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emergencyCard: {
    borderLeftWidth: 2,
    borderLeftColor: "red",
    backgroundColor: "#fff5f5",
  },

  emergencyBadge: {
    color: "red",
    fontWeight: "bold",
    marginTop: 8,
    fontSize: 14,
  },
});
