import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from './ThemedText';

type CreatePostHeaderProps = {
  onCancel: () => void;
  onPost: () => void;
  isPostDisabled: boolean;
};

const CreatePostHeader = ({ onCancel, onPost, isPostDisabled }: CreatePostHeaderProps) => {
  return (
    <LinearGradient
      colors={['#001F2D', '#003D4D', '#00435C', '#007B8C', '#00AB9E']}
      locations={[0, 0.25, 0.5, 0.75, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}>
      <View style={styles.content}>
        <TouchableOpacity onPress={onCancel}>
          <ThemedText style={styles.cancelButton}>Cancel</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Create Post</ThemedText>
        <TouchableOpacity
          onPress={onPost}
          disabled={isPostDisabled}
          style={[styles.postButton, isPostDisabled && styles.postButtonDisabled]}>
          <ThemedText style={styles.postButtonText}>Post</ThemedText>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    height: 56,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  cancelButton: {
    fontSize: 16,
    color: '#fff',
  },
  postButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  postButtonDisabled: {
    opacity: 0.5,
  },
  postButtonText: {
    color: '#00ab9e',
    fontWeight: 'bold',
  },
});

export default CreatePostHeader;
