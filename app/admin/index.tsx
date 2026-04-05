import {
  getAllComplaints,
  updateComplaintStatus,
} from "@/.vscode/services/admin";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { RefreshControl } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Predefined Reject Reasons
const rejectReasons = [
  "Insufficient evidence",
  "Invalid complaint",
  "Duplicate report",
  "Out of jurisdiction",
  "False information",
];

export default function AdminScreen() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // New States
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<"Approved" | "Rejected" | null>(null);
  const [comment, setComment] = useState("");
  const [selectedReason, setSelectedReason] = useState("");

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

  // Updated Status Handler
  const handleUpdateStatus = async () => {
    if (!selectedComplaintId || !selectedAction) return;

    // Mandatory validation for reject
    if (selectedAction === "Rejected" && !selectedReason && !comment.trim()) {
      Alert.alert("Error", "Please provide a reason for rejection");
      return;
    }

    const finalComment =
      selectedAction === "Rejected"
        ? `${selectedReason ? selectedReason + " - " : ""}${comment}`
        : comment;

    try {
      await updateComplaintStatus(selectedComplaintId, {
        status: selectedAction,
        comment: finalComment,
      });

      Alert.alert("Success", `Marked as ${selectedAction}`);

      setActionModalVisible(false);
      setComment("");
      setSelectedReason("");

      fetchComplaints();
    } catch (error) {
      console.log("Update error:", error);
      Alert.alert("Error", "Failed to update status");
    }
  };

  const isImage = (url: any) =>{
    if(!url) return false;
    const value = typeof url === "string" ? url : url?.uri;
    return (
      typeof value=== "string" &&
      (value.includes(".jpg") || value.includes(".jpeg") || value.includes(".png"))
    );
  };

  const isVideo = (url: any) =>{
    if(!url) return false;
    const value =typeof url === "string" ? url : url?.uri;
    return (
      typeof value === "string" &&
      (value.includes(".mp4") || value.includes(".mov"))
    );
  };

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

      {/* Evidence */}
      {item.evidence && (
        <TouchableOpacity
          onPress={() => {
            setSelectedEvidence(item.evidence);
            setModalVisible(true);
          }}
        >
          {isImage(item.evidence) && (
            <Image source={{ uri: item.evidence }} style={styles.image} />
          )}

          {isVideo(item.evidence) && (
            <Video
              source={{ uri: item.evidence }}
              style={styles.video}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
            />
          )}
        </TouchableOpacity>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.approveBtn}
          onPress={() => {
            setSelectedComplaintId(item._id);
            setSelectedAction("Approved");
            setActionModalVisible(true);
          }}
        >
          <Text style={styles.btnText}>Approve</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rejectBtn}
          onPress={() => {
            setSelectedComplaintId(item._id);
            setSelectedAction("Rejected");
            setActionModalVisible(true);
          }}
        >
          <Text style={styles.btnText}>Reject</Text>
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
      <View style={styles.header}>
      <Text style={styles.headerTitle}>Admin Dashboard</Text>
      <View style={{width:28}}/>
      <TouchableOpacity onPress={()=>router.push("/admin/adminsettings")}>
        <Ionicons name="settings-outline" size={26} color="black"/>
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

      {/* Evidence Modal */}
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>Close</Text>
          </TouchableOpacity>

          {selectedEvidence && isImage(selectedEvidence) && (
            <Image source={{ uri: selectedEvidence }} style={styles.fullImage} resizeMode="contain" />
          )}

          {selectedEvidence && isVideo(selectedEvidence) && (
            <Video
              source={{ uri: selectedEvidence }}
              style={styles.fullVideo}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
            />
          )}
        </View>
      </Modal>

      {/* ✅ ACTION MODAL */}
      <Modal visible={actionModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.actionModal}>
            <Text style={styles.modalTitle}>
              {selectedAction} Complaint
            </Text>

            {/* Dropdown for Reject */}
            {selectedAction === "Rejected" && (
              <>
                <Text style={{ marginBottom: 5 }}>Select Reason:</Text>
                <Picker
                  selectedValue={selectedReason}
                  onValueChange={(itemValue) => setSelectedReason(itemValue)}
                >
                  <Picker.Item label="Select a reason..." value="" />
                  {rejectReasons.map((reason, index) => (
                    <Picker.Item key={index} label={reason} value={reason} />
                  ))}
                </Picker>
              </>
            )}

            <TextInput
              placeholder="Additional comments..."
              value={comment}
              onChangeText={setComment}
              multiline
              style={styles.input}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setActionModalVisible(false);
                  setComment("");
                  setSelectedReason("");
                }}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleUpdateStatus}
              >
                <Text style={styles.btnText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f6f9" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },

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

  emergencyBadge: { color: "red", fontWeight: "bold", marginBottom: 5 },

  label: { fontSize: 12, color: "#666", marginTop: 5 },
  value: { fontSize: 15, fontWeight: "bold" },
  status: { fontSize: 14, fontWeight: "bold", color: "blue", marginTop: 5 },

  image: { width: "100%", height: 180, marginTop: 10, borderRadius: 8 },
  video: { width: "100%", height: 180, marginTop: 10 },

  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },

  approveBtn: { backgroundColor: "green", padding: 10, borderRadius: 8, width: "48%" },
  rejectBtn: { backgroundColor: "red", padding: 10, borderRadius: 8, width: "48%" },

  btnText: { color: "#fff", textAlign: "center", fontWeight: "bold" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  modalContainer: { flex: 1, backgroundColor: "black", justifyContent: "center" },
  closeBtn: { position: "absolute", top: 40, right: 20, zIndex: 10 },

  fullImage: { width: "100%", height: "80%" },
  fullVideo: { width: "100%", height: "80%" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  actionModal: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    textAlignVertical: "top",
    marginTop: 10,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  cancelBtn: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 8,
    width: "45%",
  },

  submitBtn: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 8,
    width: "45%",
  },
  header:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    padding:20,
    backgroundColor:"#fff",
    elevation:2,
    marginBottom:20,
  },
  headerTitle:{
    color:"#000000",
    marginTop:30,
    fontSize:22,
    fontWeight:"bold",
    textAlign:"center",
    justifyContent:"center",
    flex:1,
    marginLeft:35,
    
  },
});