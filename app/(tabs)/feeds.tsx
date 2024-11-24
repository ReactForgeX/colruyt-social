import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import SocialPost from "@/components/SocialPost";
import { Images } from "@/constants/Images";
import { Videos } from "@/constants/Videos";
import GradientHeader from "@/components/GradientHeader";

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

  const renderPost = ({ item }: { item: Post }) => (
    <SocialPost
      {...item}
      onDelete={() => handleDeletePost(item.id)}
      allowDelete={true}
    />
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <GradientHeader title="Colruyt Social" />
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#001824",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  scrollContent: {
    paddingBottom: 16,
  },
});
