import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface Comment {
  id: string;
  username: string;
  content: string;
  timestamp: string;
}

interface CommentsPanelProps {
  isVisible: boolean;
  onClose: () => void;
  comments: Comment[];
}

export const CommentsPanel = ({ isVisible, onClose, comments }: CommentsPanelProps) => {
  if (!isVisible) return null;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Comments</ThemedText>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <MaterialIcons name="close" size={24} color="#666666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.commentsList}>
        {comments.map((comment) => (
          <View key={comment.id} style={styles.commentItem}>
            <View style={styles.commentHeader}>
              <ThemedText style={styles.username}>{comment.username}</ThemedText>
              <ThemedText style={styles.timestamp}>{comment.timestamp}</ThemedText>
            </View>
            <ThemedText style={styles.commentContent}>{comment.content}</ThemedText>
          </View>
        ))}
        {comments.length === 0 && (
          <ThemedText style={styles.noComments}>No comments yet</ThemedText>
        )}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  commentsList: {
    flex: 1,
    padding: 16,
  },
  commentItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
    color: '#666666',
  },
  commentContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
  },
  noComments: {
    textAlign: 'center',
    color: '#666666',
    marginTop: 24,
  },
});
