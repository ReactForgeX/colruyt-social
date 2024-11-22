import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SocialPost } from "@/components/SocialPost";
import { Images } from "@/constants/Images";
import { Videos } from "@/constants/Videos";

type MediaItem = {
  type: "image" | "video";
  key: keyof typeof Images | keyof typeof Videos;
};

type Post = {
  id: string;
  username: string;
  avatarKey: string;
  content: string;
  media?: MediaItem[];
  likes: number;
  comments: number;
  timestamp: string;
};

// This would typically come from an API
const initialPosts: Post[] = [
  {
    id: "1",
    username: "Colruyt Team",
    avatarKey: "default",
    content:
      " Exciting news! We're launching a new initiative to reduce food waste in our stores. Check out how we're making a difference!",
    media: [
      { type: "video", key: "sustainabilityInitiative" },
      { type: "image", key: "sustainability" },
    ],
    likes: 245,
    comments: 42,
    timestamp: "2h ago",
  },
  {
    id: "2",
    username: "Store Manager",
    avatarKey: "user2",
    content:
      " Take a virtual tour of our newly renovated store in Brussels! We've made it more sustainable and customer-friendly.",
    media: [
      { type: "image", key: "store" },
      { type: "video", key: "storeWalkthrough" },
    ],
    likes: 189,
    comments: 28,
    timestamp: "4h ago",
  },
  {
    id: "3",
    username: "Community Team",
    avatarKey: "user3",
    content:
      " Amazing turnout at our community event yesterday! Thank you to everyone who joined us in supporting local producers.",
    media: [
      { type: "image", key: "community" },
      { type: "video", key: "communityEvent" },
      { type: "image", key: "localProduce" },
    ],
    likes: 156,
    comments: 23,
    timestamp: "6h ago",
  },
  {
    id: "4",
    username: "Green Team",
    avatarKey: "user4",
    content:
      " Our team visiting local farmers who supply fresh produce to our stores. Supporting local agriculture is at the heart of what we do!",
    media: [
      { type: "image", key: "localProduce" },
      { type: "image", key: "sustainability" },
    ],
    likes: 134,
    comments: 19,
    timestamp: "8h ago",
  },
  {
    id: "5",
    username: "HR Team",
    avatarKey: "user5",
    content:
      " Meet the amazing people behind Colruyt Group! Our team is dedicated to providing the best service to our customers.",
    media: [{ type: "image", key: "team" }],
    likes: 201,
    comments: 31,
    timestamp: "1d ago",
  },
];

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate a data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleDeletePost = (postId: string) => {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId)
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <ThemedView style={styles.header}>
          <View style={styles.headerContent}>
            <ThemedText style={styles.headerTitle}>Colruyt Social</ThemedText>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => router.push("/(profile)")}
            >
              <MaterialIcons name="account-circle" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        </ThemedView>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.scrollContent}
        >
          {posts.map((post) => (
            <SocialPost
              key={post.id}
              {...post}
              onDelete={() => handleDeletePost(post.id)}
              allowDelete={true}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#00ab9e",
  },
  header: {
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    backgroundColor: "#00ab9e",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  profileButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    paddingBottom: 16,
  },
});
