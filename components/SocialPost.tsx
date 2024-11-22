import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import { Video, ResizeMode } from "expo-av";

import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Avatars } from "@/constants/Avatars";
import { Images } from "@/constants/Images";
import { Videos } from "@/constants/Videos";

const { width } = Dimensions.get("window");

interface SocialPostProps {
  username: string;
  avatarKey?: keyof typeof Avatars;
  content: string;
  media?: Array<{
    type: "image" | "video";
    key: keyof typeof Images | keyof typeof Videos;
  }>;
  timestamp: string;
  allowDelete?: boolean;
  likes: number;
  comments: number;
  onDelete?: () => void;
}

export function SocialPost({
  username,
  avatarKey = "default",
  content,
  media,
  timestamp,
  allowDelete = false,
  likes,
  comments,
  onDelete,
}: SocialPostProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const goToNextMedia = () => {
    if (media && currentMediaIndex < media.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
    }
  };

  const goToPreviousMedia = () => {
    if (media && currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete?.();
    setShowDeleteConfirm(false);
  };

  const currentMedia = media?.[currentMediaIndex];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={Avatars[avatarKey]}
            style={styles.avatar}
          />
          <View>
            <ThemedText style={styles.username}>
              {username}
            </ThemedText>
            <ThemedText style={styles.timestamp}>
              {timestamp}
            </ThemedText>
          </View>
        </View>
        {allowDelete && (
          <TouchableOpacity onPress={handleDelete}>
            <ThemedText style={styles.menuDots}>•••</ThemedText>
          </TouchableOpacity>
        )}
      </View>

      <ThemedText style={styles.content}>
        {content}
      </ThemedText>

      {media && media.length > 0 && (
        <View style={styles.mediaContainer}>
          {currentMedia.type === "image" ? (
            <Image
              source={Images[currentMedia.key as keyof typeof Images]}
              style={styles.media}
              resizeMode="cover"
            />
          ) : (
            <Video
              source={Videos[currentMedia.key as keyof typeof Videos]}
              style={styles.media}
              resizeMode={ResizeMode.COVER}
              isLooping
              shouldPlay
            />
          )}

          {media.length > 1 && (
            <View style={styles.mediaControls}>
              <TouchableOpacity
                style={[
                  styles.mediaButton,
                  currentMediaIndex === 0 && styles.mediaButtonDisabled,
                ]}
                onPress={goToPreviousMedia}
                disabled={currentMediaIndex === 0}
              >
                <ThemedText style={styles.mediaButtonText}>←</ThemedText>
              </TouchableOpacity>
              <ThemedText style={styles.mediaCounter}>
                {currentMediaIndex + 1}/{media.length}
              </ThemedText>
              <TouchableOpacity
                style={[
                  styles.mediaButton,
                  currentMediaIndex === media.length - 1 && styles.mediaButtonDisabled,
                ]}
                onPress={goToNextMedia}
                disabled={currentMediaIndex === media.length - 1}
              >
                <ThemedText style={styles.mediaButtonText}>→</ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
        >
          <ThemedText style={styles.footerButtonText}>♥ {likes}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity>
          <ThemedText style={styles.footerButtonText}>💬 {comments}</ThemedText>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showDeleteConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteConfirm(false)}
      >
        <View style={styles.modalOverlay}>
          <ThemedView style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Delete Post?</ThemedText>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={confirmDelete}
            >
              <ThemedText style={styles.deleteButtonText}>
                Delete
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
  },
  menuDots: {
    fontSize: 24,
    paddingHorizontal: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    padding: 12,
  },
  mediaContainer: {
    width: "100%",
    backgroundColor: "#f1f1f1",
    position: "relative",
    height: width * 0.75,
  },
  media: {
    width: "100%",
    height: "100%",
  },
  mediaControls: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  mediaButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  mediaButtonDisabled: {
    opacity: 0.5,
  },
  mediaButtonText: {
    color: "white",
    fontSize: 18,
  },
  mediaCounter: {
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
  },
  footerButton: {
    marginRight: 20,
  },
  footerButtonText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    borderRadius: 12,
    overflow: "hidden",
  },
  modalHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  modalTitle: {
    fontSize: 18,
    textAlign: "center",
  },
  deleteButton: {
    padding: 16,
  },
  deleteButtonText: {
    color: "#ff3b30",
    fontSize: 16,
    textAlign: "center",
  },
});
