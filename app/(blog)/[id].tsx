import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video, ResizeMode } from 'expo-av';

import { ThemedText } from "@/components/ThemedText";
import { Avatars } from "@/constants/Avatars";
import { Images } from "@/constants/Images";
import { Videos } from "@/constants/Videos";
import { FullscreenMedia } from "@/components/FullscreenMedia";

type MediaItem = {
  type: 'image' | 'video';
  key: keyof typeof Images | keyof typeof Videos;
};

// This would typically come from an API or database
type BlogPost = {
  id: string;
  title: string;
  author: {
    name: string;
    role: string;
    avatarKey: keyof typeof Avatars;
  };
  datePosted: string;
  readTime: string;
  content: string;
  media?: MediaItem[];
  comments: Array<{
    id: string;
    username: string;
    content: string;
    timestamp: string;
  }>;
};

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Welcome to Colruyt Social",
    author: {
      name: "Colruyt Team",
      role: "Community Manager",
      avatarKey: "default",
    },
    datePosted: "November 21, 2023",
    readTime: "3 min read",
    media: [
      { type: 'image', key: 'team' },
      { type: 'video', key: 'storeWalkthrough' },
    ],
    content:
      "🌟 Welcome to our Blog! Here we share insights about sustainability, community initiatives, and the latest updates from Colruyt Group. Stay tuned for regular updates!\n\nOur commitment to transparent communication and community engagement drives us to create this space where we can share our journey, challenges, and successes with you. Through this platform, we aim to foster meaningful discussions about retail innovation, sustainability, and social responsibility.\n\nTake a virtual tour of our store in the video below to see how we're creating a modern shopping experience for our customers.",
    comments: [
      {
        id: "1",
        username: "Sarah",
        content:
          "Looking forward to reading more about sustainability initiatives!",
        timestamp: "2h ago",
      },
      {
        id: "2",
        username: "John",
        content: "Great to see Colruyt embracing social media!",
        timestamp: "3h ago",
      },
    ],
  },
  {
    id: "2",
    title: "Sustainability at Colruyt Group",
    author: {
      name: "Green Team",
      role: "Sustainability Department",
      avatarKey: "user2",
    },
    datePosted: "November 20, 2023",
    readTime: "5 min read",
    media: [
      { type: 'image', key: 'sustainability' },
      { type: 'video', key: 'sustainabilityInitiative' },
      { type: 'image', key: 'localProduce' },
    ],
    content:
      "🌱 Did you know? Our commitment to sustainability goes beyond just words. We've implemented various eco-friendly initiatives across our stores, including reducing plastic packaging and promoting local produce.\n\nIn this post, we'll dive deep into our sustainability goals and the concrete steps we're taking to achieve them. From solar panels on our warehouses to electric delivery vehicles, every action counts towards a greener future.\n\nWatch our latest sustainability initiative in action and see how we're making a difference in our communities.",
    comments: [
      {
        id: "1",
        username: "Emma",
        content:
          "The reduction in plastic packaging is really noticeable. Great job!",
        timestamp: "1d ago",
      },
    ],
  },
  {
    id: "3",
    title: "Supporting Local Communities",
    author: {
      name: "Community Team",
      role: "Local Partnerships",
      avatarKey: "user3",
    },
    datePosted: "November 19, 2023",
    readTime: "4 min read",
    media: [
      { type: 'image', key: 'community' },
      { type: 'video', key: 'communityEvent' },
      { type: 'image', key: 'store' },
    ],
    content:
      "🤝 At Colruyt Group, we believe in the power of local partnerships. Our commitment to supporting local communities goes beyond just business – it's about building lasting relationships and contributing to the growth of our neighborhoods.\n\nThis week, we're excited to highlight some of our amazing local partners and share their stories with you. From family-owned farms to artisanal producers, each partnership represents our dedication to strengthening local economies.\n\nCheck out the highlights from our recent community event below!",
    comments: [
      {
        id: "1",
        username: "Michael",
        content: "Love seeing local businesses getting support!",
        timestamp: "5h ago",
      },
    ],
  },
];

export default function BlogPostScreen() {
  const { id } = useLocalSearchParams();
  const post = blogPosts.find((p) => p.id === id);
  const [newComment, setNewComment] = useState("");
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText>Post not found</ThemedText>
      </SafeAreaView>
    );
  }

  const goToNextMedia = () => {
    if (post.media && currentMediaIndex < post.media.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
    }
  };

  const goToPreviousMedia = () => {
    if (post.media && currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };

  const currentMedia = post.media?.[currentMediaIndex];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.authorInfo}>
            <Image
              source={Avatars[post.author.avatarKey]}
              style={styles.avatar}
            />
            <View>
              <ThemedText style={styles.authorName}>
                {post.author.name}
              </ThemedText>
              <ThemedText style={styles.authorRole}>
                {post.author.role}
              </ThemedText>
            </View>
          </View>
          <View style={styles.postInfo}>
            <ThemedText style={styles.date}>
              Posted on {post.datePosted}
            </ThemedText>
            <ThemedText style={styles.readTime}>{post.readTime}</ThemedText>
          </View>

          <ThemedText style={styles.title}>{post.title}</ThemedText>
        </View>

        {post.media && post.media.length > 0 && (
          <View style={styles.mediaContainer}>
            <TouchableOpacity
              style={styles.mediaWrapper}
              onPress={() => setIsFullscreen(true)}
              activeOpacity={0.9}
            >
              {currentMedia.type === 'image' ? (
                <Image
                  source={Images[currentMedia.key as keyof typeof Images]}
                  style={styles.media}
                  resizeMode="cover"
                />
              ) : (
                <Video
                  source={Videos[currentMedia.key as keyof typeof Videos]}
                  style={styles.media}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                />
              )}
            </TouchableOpacity>

            {post.media.length > 1 && (
              <View style={styles.mediaControls}>
                <TouchableOpacity
                  style={[styles.mediaButton, currentMediaIndex === 0 && styles.mediaButtonDisabled]}
                  onPress={goToPreviousMedia}
                  disabled={currentMediaIndex === 0}
                >
                  <ThemedText style={styles.mediaButtonText}>←</ThemedText>
                </TouchableOpacity>
                <ThemedText style={styles.mediaCounter}>
                  {currentMediaIndex + 1} / {post.media.length}
                </ThemedText>
                <TouchableOpacity
                  style={[styles.mediaButton, currentMediaIndex === post.media.length - 1 && styles.mediaButtonDisabled]}
                  onPress={goToNextMedia}
                  disabled={currentMediaIndex === post.media.length - 1}
                >
                  <ThemedText style={styles.mediaButtonText}>→</ThemedText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        <ThemedText style={styles.content}>{post.content}</ThemedText>

        <View style={styles.commentsSection}>
          <ThemedText style={styles.commentsHeader}>
            Comments ({post.comments.length})
          </ThemedText>
          {post.comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <View style={styles.commentHeader}>
                <ThemedText style={styles.commentUsername}>
                  {comment.username}
                </ThemedText>
                <ThemedText style={styles.commentTimestamp}>
                  {comment.timestamp}
                </ThemedText>
              </View>
              <ThemedText style={styles.commentContent}>
                {comment.content}
              </ThemedText>
            </View>
          ))}
        </View>
      </ScrollView>

      {currentMedia && (
        <FullscreenMedia
          isVisible={isFullscreen}
          onClose={() => setIsFullscreen(false)}
          type={currentMedia.type}
          source={currentMedia.key}
        />
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.commentInputContainer}
      >
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        <TouchableOpacity
          style={styles.commentButton}
          onPress={() => {
            // Handle comment submission
            setNewComment("");
          }}
        >
          <ThemedText style={styles.commentButtonText}>Post</ThemedText>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "600",
  },
  authorRole: {
    fontSize: 14,
    color: "#666",
  },
  postInfo: {
    flexDirection: "row",
    marginBottom: 16,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginRight: 12,
  },
  readTime: {
    fontSize: 14,
    color: "#666",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  mediaContainer: {
    width: width,
    height: width * 0.75,
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  mediaWrapper: {
    width: '100%',
    height: '100%',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  mediaControls: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  mediaButtonDisabled: {
    opacity: 0.5,
  },
  mediaButtonText: {
    color: 'white',
    fontSize: 18,
  },
  mediaCounter: {
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 14,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    padding: 16,
  },
  commentsSection: {
    padding: 16,
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  comment: {
    marginBottom: 16,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  commentUsername: {
    fontWeight: "600",
  },
  commentTimestamp: {
    color: "#666",
    fontSize: 12,
  },
  commentContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  commentInputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  commentButton: {
    backgroundColor: "#00ab9e",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  commentButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
