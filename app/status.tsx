import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { getComplaints } from '@/.vscode/services/complaint'; // adjust path if needed

type Complaint = {
  _id: string;
  crimeType: string;
  location: string;
  status: string;
  date: string;
  emergency?: boolean;
};

export default function StatusPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch complaints
  const fetchComplaints = async () => {
    try {
      const response = await getComplaints();
      setComplaints(response.data);
    } catch (error: any) {
      console.log("Fetch error:", error);
      Alert.alert("Error", "Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  //  Status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "orange";
      case "Approved":
        return "green";
      case "Rejected":
        return "red";
      default:
        return "blue";
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
        <Text>Loading complaints...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Complaints</Text>

      <FlatList
        data={complaints}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text>No complaints found</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.label}>Complaint ID</Text>
            <Text style={styles.value}>{item._id}</Text>

            <Text style={styles.label}>Crime Type</Text>
            <Text style={styles.value}>{item.crimeType}</Text>

            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{item.location}</Text>

            <Text style={styles.label}>Status</Text>
            <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
              {item.status}
            </Text>

            {/* 🚨 Emergency Tag */}
            {item.emergency && (
              <Text style={styles.emergency}>🚨 Emergency</Text>
            )}
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/dashboard')}
      >
        <Text style={styles.buttonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },

  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },

  label: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },

  value: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },

  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },

  emergency: {
    marginTop: 10,
    color: 'red',
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: "#0f1627",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});