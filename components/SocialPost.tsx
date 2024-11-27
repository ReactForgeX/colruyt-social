import { MaterialIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { CommentsPanel } from './CommentsPanel';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

import { Avatars } from '@/constants/Avatars';
import { Images } from '@/constants/Images';
import { Videos } from '@/constants/Videos';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width, height } = Dimensions.get('window');

interface Comment {
  id: string;
  username: string;
  content: string;
  timestamp: string;
  avatarKey?: keyof typeof Avatars;
  likes?: number;
}

interface SocialPostProps {
  username: string;
  avatarKey?: keyof typeof Avatars;
  content: string;
  media?: {
    type: 'image' | 'video';
    key: keyof typeof Images | keyof typeof Videos;
  }[];
  timestamp: string;
  allowDelete?: boolean;
  likes: number;
  comments: number;
  commentsList?: Comment[];
  onDelete?: () => void;
  onAddComment?: (content: string) => void;
  onLikeComment?: (commentId: string) => void;
}

const SocialPost = ({
  username,
  avatarKey = 'default',
  content,
  media,
  timestamp,
  allowDelete = false,
  likes,
  comments,
  commentsList = [],
  onDelete,
  onAddComment,
  onLikeComment,
}: SocialPostProps) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState<{ [key: string]: boolean }>({});
  const colorScheme = useColorScheme();
  const videoRef = useRef<Video>(null);

  const handleLikeComment = (commentId: string) => {
    setLikedComments(prev => ({ ...prev, [commentId]: !prev[commentId] }));
    onLikeComment?.(commentId);
  };

  const handleSendComment = () => {
    if (newComment.trim()) {
      onAddComment?.(newComment.trim());
      setNewComment('');
    }
  };

  const currentMedia = media?.[currentMediaIndex];

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

  const handleVideoPress = async () => {
    try {
      if (videoRef.current) {
        await videoRef.current.presentFullscreenPlayer();
      }
    } catch (error) {
      console.log('Error presenting fullscreen:', error);
    }
  };

  const handleFullscreenUpdate = async ({ fullscreenUpdate }: { fullscreenUpdate: number }) => {
    if (fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_WILL_PRESENT) {
      setIsFullscreen(true);
      if (videoRef.current) {
        await videoRef.current.setIsMutedAsync(false);
      }
    } else if (fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS) {
      setIsFullscreen(false);
      if (videoRef.current) {
        await videoRef.current.setIsMutedAsync(true);
      }
    }
  };

  const handleImagePress = () => {
    setIsImageFullscreen(true);
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: '#ffffff' }]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={Avatars[avatarKey]} style={styles.avatar} />
          <View>
            <ThemedText style={styles.username}>{username}</ThemedText>
            <ThemedText style={styles.timestamp}>{timestamp}</ThemedText>
          </View>
        </View>
        {allowDelete && (
          <TouchableOpacity onPress={handleDelete}>
            <ThemedText style={styles.menuDots}>•••</ThemedText>
          </TouchableOpacity>
        )}
      </View>

      <ThemedText style={styles.content}>{content}</ThemedText>

      {media && media.length > 0 && (
        <View style={styles.mediaContainer}>
          {currentMedia.type === 'image' ? (
            <>
              <TouchableOpacity onPress={handleImagePress}>
                <Image
                  source={Images[currentMedia.key as keyof typeof Images]}
                  style={styles.media}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <Modal
                visible={isImageFullscreen}
                transparent
                onRequestClose={() => {
                  setIsImageFullscreen(false);
                }}>
                <View style={styles.fullscreenContainer}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                      setIsImageFullscreen(false);
                    }}>
                    <MaterialIcons name="close" size={28} color="#fff" />
                  </TouchableOpacity>
                  <Image
                    source={Images[currentMedia.key as keyof typeof Images]}
                    style={styles.fullscreenImage}
                    resizeMode="contain"
                  />
                </View>
              </Modal>
            </>
          ) : (
            <TouchableOpacity onPress={handleVideoPress} activeOpacity={0.9}>
              <Video
                ref={videoRef}
                source={
                  currentMedia?.type === 'video'
                    ? Videos[currentMedia.key as keyof typeof Videos]
                    : undefined
                }
                style={styles.media}
                resizeMode={isFullscreen ? 'contain' : 'cover'}
                shouldPlay
                isLooping
                isMuted={!isFullscreen}
                useNativeControls={isFullscreen}
                onFullscreenUpdate={handleFullscreenUpdate}
              />
            </TouchableOpacity>
          )}

          {media.length > 1 && (
            <View style={styles.mediaControls}>
              <TouchableOpacity
                style={[styles.mediaButton, currentMediaIndex === 0 && styles.mediaButtonDisabled]}
                onPress={goToPreviousMedia}
                disabled={currentMediaIndex === 0}>
                <MaterialIcons name="chevron-left" size={24} color="#333" />
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
                disabled={currentMediaIndex === media.length - 1}>
                <MaterialIcons name="chevron-right" size={24} color="#333" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <View style={styles.interactionContainer}>
            <MaterialIcons name="favorite-border" size={24} color="#FF4081" />
            <ThemedText style={styles.interactionText}>{likes}</ThemedText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => {
            setShowComments(!showComments);
          }}>
          <View style={styles.interactionContainer}>
            <MaterialIcons name="chat-bubble-outline" size={22} color="#2196F3" />
            <ThemedText style={styles.interactionText}>{comments}</ThemedText>
          </View>
        </TouchableOpacity>
      </View>

      {showComments && (
        <View style={styles.commentsSection}>
          {commentsList.map(comment => (
            <View key={comment.id} style={styles.commentItem}>
              <View style={styles.commentHeader}>
                <View style={styles.commentUser}>
                  <Image
                    source={Avatars[comment.avatarKey || 'default']}
                    style={styles.commentAvatar}
                  />
                  <View style={styles.commentBubble}>
                    <ThemedText style={styles.commentUsername}>{comment.username}</ThemedText>
                    <ThemedText style={styles.commentContent}>{comment.content}</ThemedText>
                  </View>
                </View>
              </View>
              <View style={styles.commentActions}>
                <TouchableOpacity
                  onPress={() => {
                    handleLikeComment(comment.id);
                  }}
                  style={styles.commentAction}>
                  <ThemedText
                    style={[
                      styles.commentActionText,
                      likedComments[comment.id] && styles.commentActionTextLiked,
                    ]}>
                    Like
                  </ThemedText>
                </TouchableOpacity>
                <ThemedText style={styles.commentDot}>•</ThemedText>
                <ThemedText style={styles.commentTimestamp}>{comment.timestamp}</ThemedText>
                {comment.likes && comment.likes > 0 && (
                  <>
                    <ThemedText style={styles.commentDot}>•</ThemedText>
                    <View style={styles.commentLikes}>
                      <MaterialIcons
                        name={likedComments[comment.id] ? 'favorite' : 'favorite-border'}
                        size={12}
                        color={likedComments[comment.id] ? '#FF4081' : '#666666'}
                      />
                      <ThemedText style={styles.commentLikesText}>
                        {comment.likes + (likedComments[comment.id] ? 1 : 0)}
                      </ThemedText>
                    </View>
                  </>
                )}
              </View>
            </View>
          ))}

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.commentInputContainer}>
            <Image source={Avatars[avatarKey]} style={styles.commentAvatar} />
            <View style={styles.commentInputWrapper}>
              <TextInput
                style={styles.commentInput}
                placeholder="Write a comment..."
                placeholderTextColor="#666666"
                value={newComment}
                onChangeText={setNewComment}
                multiline
                returnKeyType="default"
              />
              <TouchableOpacity
                style={[styles.sendButton, !newComment.trim() && styles.sendButtonDisabled]}
                onPress={handleSendComment}
                disabled={!newComment.trim()}>
                <MaterialIcons
                  name="send"
                  size={20}
                  color={newComment.trim() ? '#2196F3' : '#BDBDBD'}
                />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      )}

      <Modal
        visible={showDeleteConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setShowDeleteConfirm(false);
        }}>
        <View style={styles.modalOverlay}>
          <ThemedView style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Delete Post?</ThemedText>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
              <ThemedText style={styles.deleteButtonText}>Delete</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </View>
      </Modal>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  timestamp: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  menuDots: {
    fontSize: 20,
    color: '#666666',
    marginRight: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 12,
    paddingBottom: 12,
    color: '#333333',
  },
  mediaContainer: {
    position: 'relative',
  },
  media: {
    width,
    height: width * 0.75,
    backgroundColor: '#000',
  },
  mediaControls: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  mediaButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mediaButtonDisabled: {
    opacity: 0.4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  mediaCounter: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  footer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  footerButton: {
    marginRight: 24,
  },
  interactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  deleteButton: {
    backgroundColor: '#FF4444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width,
    height,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 8,
  },
  commentsSection: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  commentItem: {
    marginTop: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  commentUser: {
    flexDirection: 'row',
    flex: 1,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  commentBubble: {
    backgroundColor: '#f0f0f0',
    borderRadius: 18,
    padding: 8,
    paddingHorizontal: 12,
    flex: 1,
  },
  commentUsername: {
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 2,
  },
  commentContent: {
    fontSize: 14,
    lineHeight: 18,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 40,
    marginTop: 4,
  },
  commentAction: {
    marginRight: 4,
  },
  commentActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  commentActionTextLiked: {
    color: '#FF4081',
  },
  commentDot: {
    fontSize: 12,
    color: '#666666',
    marginHorizontal: 4,
  },
  commentTimestamp: {
    fontSize: 12,
    color: '#666666',
  },
  commentLikes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentLikesText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  commentInputWrapper: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    minHeight: 36,
    maxHeight: 100,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  commentInput: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    paddingRight: 40,
  },
  sendButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default SocialPost;
