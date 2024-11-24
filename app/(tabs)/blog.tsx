import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import GradientHeader from "@/components/GradientHeader";
import { Images } from "@/constants/Images";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  datePosted: string;
  readTime: string;
  imageKey: keyof typeof Images;
};

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Welcome to Colruyt Social",
    excerpt: "Discover how our platform brings the Colruyt community together...",
    category: "Community",
    datePosted: "May 15, 2024",
    readTime: "5 min read",
    imageKey: "image1",
  },
  {
    id: "2",
    title: "Sustainability at Colruyt",
    excerpt: "Learn about our latest initiatives for a greener future...",
    category: "Sustainability",
    datePosted: "May 14, 2024",
    readTime: "4 min read",
    imageKey: "image2",
  },
  // Add more blog posts as needed
];

export default function BlogScreen() {
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <GradientHeader title="Blog" />
      <ScrollView style={styles.scrollView}>
        {blogPosts.map((post) => (
          <View key={post.id} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.postMeta}>
                <ThemedText style={styles.category}>{post.category}</ThemedText>
                <View style={styles.dot} />
                <ThemedText style={styles.date}>{post.datePosted}</ThemedText>
              </View>
              <ThemedText style={styles.title}>{post.title}</ThemedText>
              <ThemedText style={styles.excerpt} numberOfLines={2}>
                {post.excerpt}
              </ThemedText>
              <View style={styles.readMoreContainer}>
                <ThemedText style={styles.readTime}>{post.readTime}</ThemedText>
                <MaterialIcons name="arrow-forward" size={20} color="#00ab9e" />
              </View>
            </View>
          </View>
        ))}
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
  card: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  cardContent: {
    padding: 16,
  },
  postMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: "#00ab9e",
    fontWeight: "500",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#666666",
    marginHorizontal: 8,
  },
  date: {
    fontSize: 14,
    color: "#666666",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
  },
  excerpt: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333333",
    marginBottom: 12,
  },
  readMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  readTime: {
    fontSize: 14,
    color: "#666666",
  },
});
