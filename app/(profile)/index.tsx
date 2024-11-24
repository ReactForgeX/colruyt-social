import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Images } from "@/constants/Images";
import GradientHeader from "@/components/GradientHeader";

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditImage = () => {
    // Handle image edit functionality
  };

  const handleLogout = () => {
    // Handle logout functionality
    console.log('Logout pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <GradientHeader title="Profile" showProfileButton={false} />
      <ScrollView style={styles.scrollView}>
        {/* Cover Image and Profile Section */}
        <View style={styles.coverContainer}>
          <View style={styles.coverBackground} />
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={Images.user1}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <TouchableOpacity 
                style={styles.editImageButton}
                onPress={handleEditImage}
              >
                <MaterialIcons name="photo-camera" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            
            {/* Profile Info Section */}
            <View style={styles.infoContainer}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.role}>Store Manager</Text>
              <Text style={styles.location}>
                <MaterialIcons name="location-on" size={16} color="#ffffff" />
                <Text style={styles.locationText}>{" Brussels, Belgium"}</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1.2k</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>890</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.aboutContainer}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            Store Manager at Colruyt Group with 5+ years of experience. Passionate about retail excellence and team leadership.
          </Text>
        </View>

        {/* Settings Section */}
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="notifications" size={24} color="teal" />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="lock" size={24} color="teal" />
              <Text style={styles.settingText}>Privacy</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="feedback" size={24} color="teal" />
              <Text style={styles.settingText}>Feedback</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="help" size={24} color="teal" />
              <Text style={styles.settingText}>Help & Support</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, styles.settingItemLast]} onPress={handleLogout}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="logout" size={24} color="red" />
              <Text style={[styles.settingText, { color: 'red' }]}>Logout</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001824",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  coverContainer: {
    height: 200,
    position: "relative",
    overflow: "hidden",
    marginTop: 0,
  },
  coverBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "#20B2AA",  
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    opacity: 0.95,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  profileSection: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    position: "relative",
    borderRadius: 75,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#ffffff",
  },
  editImageButton: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    backgroundColor: '#00ab9e',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: "#ffffff",
    opacity: 0.9,
    fontWeight: "600",
    marginBottom: 8,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#ffffff",
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginTop: 24,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 16,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#00ab9e",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
  aboutContainer: {
    backgroundColor: "#ffffff",
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#666666",
  },
  settingsContainer: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    fontWeight: '500',
  },
});
