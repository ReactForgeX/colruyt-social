import React, { useState } from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface CreatePostModalProps {
  isVisible: boolean;
  onClose: () => void;
  onPost: (content: string) => void;
}

export function CreatePostModal({ isVisible, onClose, onPost }: CreatePostModalProps) {
  const [content, setContent] = useState('');

  const handlePost = () => {
    if (content.trim()) {
      onPost(content);
      setContent('');
      onClose();
    }
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.overlay}>
          <ThemedView style={styles.content}>
            <View style={styles.header}>
              <ThemedText type="subtitle" style={{ marginBottom: 20 }}>
                Create New Post
              </ThemedText>
              <TouchableOpacity onPress={onClose}>
                <ThemedText style={styles.closeButton}>✕</ThemedText>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="What's on your mind?"
              placeholderTextColor="#666"
              multiline
              value={content}
              onChangeText={setContent}
              autoFocus
            />

            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.postButton, !content.trim() && styles.postButtonDisabled]}
                onPress={handlePost}
                disabled={!content.trim()}>
                <ThemedText style={styles.postButtonText}>Post</ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 24,
    opacity: 0.7,
  },
  input: {
    height: 150,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
    fontSize: 16,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  footer: {
    alignItems: 'flex-end',
  },
  postButton: {
    backgroundColor: '#00ab9e',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  postButtonDisabled: {
    opacity: 0.5,
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
