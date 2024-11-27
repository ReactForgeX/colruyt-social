import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

import { Avatars } from '@/constants/Avatars';
import { Images } from '@/constants/Images';

interface BlogPostProps {
  username: string;
  avatarKey?: keyof typeof Avatars;
  content: string;
  imageKey?: keyof typeof Images;
  timestamp: string;
}

export function BlogPost({
  username,
  avatarKey = 'default',
  content,
  imageKey,
  timestamp,
}: BlogPostProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={Avatars[avatarKey]} style={styles.avatar} />
          <View>
            <ThemedText style={styles.username}>{username}</ThemedText>
            <ThemedText style={styles.timestamp}>{timestamp}</ThemedText>
          </View>
        </View>
      </View>

      <ThemedText style={styles.content}>{content}</ThemedText>

      {imageKey && (
        <View style={styles.imageContainer}>
          <Image source={Images[imageKey]} style={styles.image} resizeMode="cover" />
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 16,
    marginBottom: 8,
    borderBottomWidth: 8,
    borderBottomColor: '#f1f1f1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: '600',
    color: '#000000',
  },
  timestamp: {
    fontSize: 12,
    color: '#666666',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    paddingHorizontal: 16,
    color: '#333333',
  },
  imageContainer: {
    marginTop: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
});
