import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Video, ResizeMode } from "expo-av";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { enhanceText } from "@/utils/openai";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type MediaAsset = {
  type: "image" | "video";
  uri: string;
};

export default function CreatePostScreen() {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<MediaAsset | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMedia({ type: "image", uri: result.assets[0].uri });
    }
  };

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
      videoMaxDuration: 60,
    });

    if (!result.canceled) {
      setMedia({ type: "video", uri: result.assets[0].uri });
    }
  };

  const removeMedia = () => {
    setMedia(null);
  };

  const handleMagicText = async () => {
    if (!content.trim()) return;

    setIsEnhancing(true);
    try {
      const enhancedText = await enhanceText(content);
      setContent(enhancedText);
    } catch (error) {
      console.error("Error enhancing text:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSubmit = () => {
    if (content.trim()) {
      // Here you would typically send the post and media to your backend
      // For now, we'll just go back to the home screen
      router.back();
    }
  };

  const renderMediaButtons = () => (
    <View style={styles.mediaButtonsContainer}>
      <TouchableOpacity style={styles.mediaButton} onPress={pickImage}>
        <View style={styles.mediaButtonIcon}>
          <IconSymbol name="photo.fill" size={24} color="#fff" />
        </View>
        <ThemedText style={styles.mediaButtonText}>Photos</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.mediaButton} onPress={pickVideo}>
        <View style={styles.mediaButtonIcon}>
          <IconSymbol name="video.fill" size={24} color="#fff" />
        </View>
        <ThemedText style={styles.mediaButtonText}>Videos</ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ThemedView style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()}>
              <ThemedText style={styles.cancelButton}>Cancel</ThemedText>
            </TouchableOpacity>
            <ThemedText style={styles.headerTitle}>Create Post</ThemedText>
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!content.trim()}
              style={[
                styles.postButton,
                !content.trim() && styles.postButtonDisabled,
              ]}
            >
              <ThemedText style={styles.postButtonText}>Post</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.content}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              multiline
              placeholder="What's on your mind?"
              placeholderTextColor="#666"
              value={content}
              onChangeText={setContent}
              autoFocus
            />
            <TouchableOpacity
              style={[
                styles.magicButton,
                !content.trim() && styles.magicButtonDisabled,
              ]}
              onPress={handleMagicText}
              disabled={!content.trim() || isEnhancing}
            >
              {isEnhancing ? (
                <ActivityIndicator color="#00ab9e" size="small" />
              ) : (
                <>
                  <IconSymbol
                    name="wand.and.stars"
                    size={20}
                    color={content.trim() ? "#00ab9e" : "#999"}
                  />
                  <ThemedText
                    style={[
                      styles.magicButtonText,
                      !content.trim() && styles.magicButtonTextDisabled,
                    ]}
                  >
                    Magic Text
                  </ThemedText>
                </>
              )}
            </TouchableOpacity>
          </View>

          {media && (
            <View style={styles.mediaPreview}>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={removeMedia}
              >
                <IconSymbol name="xmark.circle.fill" size={24} color="#fff" />
              </TouchableOpacity>
              {media.type === "image" ? (
                <Image
                  source={{ uri: media.uri }}
                  style={styles.mediaContent}
                />
              ) : (
                <Video
                  source={{ uri: media.uri }}
                  style={styles.mediaContent}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping={false}
                />
              )}
            </View>
          )}

          {renderMediaButtons()}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    height: 56,
    backgroundColor: "#00ab9e",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  cancelButton: {
    fontSize: 16,
    color: "#fff",
  },
  postButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  postButtonDisabled: {
    opacity: 0.5,
  },
  postButtonText: {
    color: "#00ab9e",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  input: {
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: "top",
    minHeight: 120,
    maxHeight: 200,
    padding: 12,
  },
  magicButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
  },
  magicButtonDisabled: {
    opacity: 0.5,
  },
  magicButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#00ab9e",
    fontWeight: "600",
  },
  magicButtonTextDisabled: {
    color: "#999",
  },
  mediaButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
  },
  mediaButton: {
    alignItems: "center",
    backgroundColor: "#00ab9e",
    borderRadius: 50,
    paddingHorizontal: 32,
    paddingVertical: 12,
    flexDirection: "row",
    minWidth: 140,
    justifyContent: "center",
  },
  mediaButtonIcon: {
    marginRight: 8,
  },
  mediaButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  mediaPreview: {
    position: "relative",
    width: "100%",
    height: 200,
    marginVertical: 16,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  mediaContent: {
    width: "100%",
    height: "100%",
  },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 12,
  },
});
