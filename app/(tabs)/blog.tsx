import { StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BlogPost } from "@/components/BlogPost";
import { Images } from "@/constants/Images";
import { Videos } from "@/constants/Videos";

type MediaItem = {
  type: "image" | "video";
  key: keyof typeof Images | keyof typeof Videos;
};

// This would typically come from an API or database
const blogPosts = [
  {
    id: "1",
    username: "Colruyt Team",
    avatarKey: "default",
    content:
      "Welcome to our Blog! Here we share insights about sustainability, community initiatives, and the latest updates from Colruyt Group. Stay tuned for regular updates!",
    imageKey: "team",
    timestamp: "1d ago",
  },
  {
    id: "2",
    username: "Sustainability Team",
    avatarKey: "user2",
    content:
      "Did you know? Our commitment to sustainability goes beyond just words. We've implemented various eco-friendly initiatives across our stores, including reducing plastic packaging and promoting local produce.",
    imageKey: "sustainability",
    timestamp: "2d ago",
  },
  {
    id: "3",
    username: "Community Manager",
    avatarKey: "user3",
    content:
      "At Colruyt Group, we believe in the power of local partnerships. Our commitment to supporting local communities goes beyond just business.",
    imageKey: "community",
    timestamp: "3d ago",
  },
];

export default function BlogScreen() {
  const router = useRouter();

  const handlePostPress = (postId: string) => {
    router.push({
      pathname: "/(blog)/[id]",
      params: { id: postId },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.headerTitle}>Blog</ThemedText>
        </ThemedView>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {blogPosts.map((post) => (
            <TouchableOpacity
              key={post.id}
              onPress={() => handlePostPress(post.id)}
            >
              <BlogPost
                username={post.username}
                avatarKey={post.avatarKey}
                content={post.content}
                imageKey={post.imageKey}
                timestamp={post.timestamp}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
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
    backgroundColor: "#00ab9e",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    paddingBottom: 16,
  },
});
