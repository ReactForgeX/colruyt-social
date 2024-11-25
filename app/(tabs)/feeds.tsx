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
import { Avatars } from "@/constants/Avatars";
import GradientHeader from "@/components/GradientHeader";

const PendingPollCard = () => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      onPress={() => router.push("/poll")}
      activeOpacity={1}
    >
      <ThemedView style={styles.pollCard}>
        <View style={styles.pollIconContainer}>
          <MaterialIcons name="poll" size={24} color="#F97316" />
        </View>
        <View style={styles.pollContent}>
          <ThemedText style={styles.pollTitle}>You have a pending Poll</ThemedText>
          <ThemedText style={styles.pollTeam}>HR Team</ThemedText>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#F97316" />
      </ThemedView>
    </TouchableOpacity>
  );
};

type MediaItem = {
  type: "image" | "video";
  key: keyof typeof Images | keyof typeof Videos;
};

type Post = {
  id: string;
  username: string;
  avatarKey: keyof typeof Avatars;
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
    username: "John Doe",
    avatarKey: "user1",  
    content: "First post on Colruyt Social!",
    likes: 5,
    comments: 2,
    timestamp: new Date().toISOString(),
  },
  {
    id: "2",
    username: "Jane Smith",
    avatarKey: "user2",  
    content: "Enjoying my day at Colruyt!",
    likes: 10,
    comments: 3,
    timestamp: new Date().toISOString(),
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
          ListHeaderComponent={<PendingPollCard />}
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
  pollCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    margin: 5,
    padding: 12,
    borderRadius: 12,
  },
  pollIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFEDD5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pollContent: {
    flex: 1,
  },
  pollTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F97316',
    marginBottom: 2,
  },
  pollTeam: {
    fontSize: 12,
    color: '#FB923C',
    fontWeight: '500',
  },
});
