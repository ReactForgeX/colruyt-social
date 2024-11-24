import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Images } from "@/constants/Images";
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleEditImage = () => {
    // Handle image edit functionality
  };

  const handleLogout = () => {
    // Handle logout functionality
    console.log('Logout pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Cover Image and Profile Section */}
        <View style={styles.coverContainer}>
          <LinearGradient
            colors={[
              '#001F2D',
              '#003D4D',
              '#00435C',
              '#007B8C',
              '#00AB9E',
            ]}
            locations={[0, 0.25, 0.5, 0.75, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.coverBackground}
          >
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.push("/feeds")}
            >
              <MaterialIcons name="arrow-back" size={24} color="#001824" />
            </TouchableOpacity>
            <View style={styles.profileSection}>
              <View style={styles.profileImageContainer}>
                <LinearGradient
                  colors={['#00AB9E', '#007B8C', '#003D4D']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.imageGradientBorder}
                >
                  <View style={styles.imageWrapper}>
                    <Image
                      source={Images.user1}
                      style={styles.profileImage}
                      resizeMode="cover"
                    />
                  </View>
                </LinearGradient>
                <Pressable 
                  style={({ pressed }) => [
                    styles.editImageButton,
                    pressed && styles.editImageButtonPressed
                  ]}
                  onPress={handleEditImage}
                >
                  <MaterialIcons name="photo-camera" size={20} color="#fff" />
                </Pressable>
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
          </LinearGradient>
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
    height: 300,
    position: "relative",
    overflow: "hidden",
    marginTop: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
  },
  coverBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 42,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    padding: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  imageGradientBorder: {
    borderRadius: 24,
    padding: 3,
    transform: [{ rotate: '45deg' }],
  },
  imageWrapper: {
    width: 90,
    height: 90,
    borderRadius: 24,
    transform: [{ rotate: '-45deg' }],
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: "#ffffff",
    backgroundColor: '#ffffff',
  },
  profileImage: {
    width: '140%',
    height: '140%',
    marginLeft: '-20%',
    marginTop: '-20%',
  },
  editImageButton: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    backgroundColor: '#00ab9e',
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.65,
    elevation: 6,
    zIndex: 1,
  },
  editImageButtonPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
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
