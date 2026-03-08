import {
  getAllComplaints,
  updateComplaintStatus,
} from "@/.vscode/services/admin";
import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export default function AdminScreen() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await getAllComplaints();

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.complaints || [];

      setComplaints(data);
    } catch (error: any) {
      console.log("Error:", error);
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

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await updateComplaintStatus(id, status);
      Alert.alert("Success", `Marked as ${status}`);
      fetchComplaints();
    } catch (error) {
      console.log("Update error:", error);
      Alert.alert("Error", "Failed to update status");
    }
  };

  const isImage = (url: string) =>
    url?.match(/\.(jpg|jpeg|png|webp|gif)(\?|$)/i) !== null ||
    url?.includes("/image/upload/"); // ✅ Cloudinary image URLs always have this

  const isVideo = (url: string) =>
    url?.match(/\.(mp4|mov|webm)(\?|$)/i) !== null ||
    url?.includes("/video/upload/"); // ✅ Cloudinary video URLs always have this

  const renderItem = ({ item }: any) => (
    <View style={[styles.card, item.isEmergency && styles.emergencyCard]}>
      {item.isEmergency && (
        <Text style={styles.emergencyBadge}>🚨 EMERGENCY</Text>
      )}

      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{item.reportedBy}</Text>

      <Text style={styles.label}>Crime:</Text>
      <Text style={styles.value}>{item.crimeType}</Text>

      <Text style={styles.label}>Location:</Text>
      <Text style={styles.value}>{item.location}</Text>

      <Text style={styles.label}>Status:</Text>
      <Text style={styles.status}>{item.status}</Text>

      {/* ✅ Show images */}
      {item.evidence?.images?.length > 0 && (
        <View>
          <Text style={styles.label}>Images:</Text>
          <ScrollView horizontal>
            {item.evidence.images.map((url: string, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedEvidence(url);
                  setModalVisible(true);
                }}
              >
                <Image source={{ uri: url }} style={styles.image} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* ✅ Show videos */}
      {item.evidence?.videos?.length > 0 && (
        <View>
          <Text style={styles.label}>Videos:</Text>
          {item.evidence.videos.map((url: string, index: number) => (
            <Video
              key={index}
              source={{ uri: url }}
              style={styles.video}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
            />
          ))}
        </View>
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

        <TouchableOpacity
          style={styles.completedBtn}
          onPress={() => handleUpdateStatus(item._id, "Resolved")}
        >
          <Text style={styles.btnText}>Resolved</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <View style={{ width: 28 }} />
        <TouchableOpacity onPress={() => router.push("/admin/adminsettings")}>
          <Ionicons name="settings-outline" size={26} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={complaints}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Fullscreen Evidence */}
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>Close</Text>
          </TouchableOpacity>

          {selectedEvidence && isImage(selectedEvidence) && (
            <Image
              source={{ uri: selectedEvidence }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          )}

          {selectedEvidence && isVideo(selectedEvidence) && (
            <Video
              source={{ uri: selectedEvidence }}
              style={styles.fullVideo}
              resizeMode={ResizeMode.CONTAIN}
              useNativeControls
            />
          )}
        </View>
      </Modal>
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

  emergencyCard: {
    borderLeftWidth: 4,
    borderLeftColor: "red",
    backgroundColor: "#fff5f5",
  },

  emergencyBadge: {
    color: "red",
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 14,
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

  image: {
    width: 200,
    height: 180,
    marginTop: 10,
    borderRadius: 8,
  },

  video: {
    width: "100%",
    height: 180,
    marginTop: 10,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  approveBtn: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 8,
    width: "30%",
  },

  rejectBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    width: "30%",
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

  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },

  closeBtn: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
    backgroundColor: "#fff",
  },

  headerTitle: {
    color: "#000000",
    marginTop: 30,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    flex: 1,
    marginLeft: 35,
  },

  fullImage: {
    width: "100%",
    height: "80%",
  },

  fullVideo: {
    width: "100%",
    height: "80%",
  },

  completedBtn: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 8,
    width: "30%",
  },
});
