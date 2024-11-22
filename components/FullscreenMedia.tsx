import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';

import { ThemedText } from './ThemedText';
import { Images } from '@/constants/Images';
import { Videos } from '@/constants/Videos';

interface FullscreenMediaProps {
  isVisible: boolean;
  onClose: () => void;
  type: 'image' | 'video';
  source: keyof typeof Images | keyof typeof Videos;
}

export function FullscreenMedia({ isVisible, onClose, type, source }: FullscreenMediaProps) {
  const [orientation, setOrientation] = React.useState<'PORTRAIT' | 'LANDSCAPE'>('PORTRAIT');

  React.useEffect(() => {
    if (isVisible && type === 'video') {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      setOrientation('LANDSCAPE');
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      setOrientation('PORTRAIT');
    }

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, [isVisible, type]);

  const { width, height } = Dimensions.get('window');
  const mediaStyle = orientation === 'LANDSCAPE'
    ? { width: width, height: height }
    : { width: width, height: height * 0.8 };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <StatusBar hidden={orientation === 'LANDSCAPE'} />
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.closeButton, orientation === 'LANDSCAPE' && styles.closeButtonLandscape]}
          onPress={onClose}
        >
          <ThemedText style={styles.closeButtonText}>✕</ThemedText>
        </TouchableOpacity>

        <View style={[styles.mediaContainer, mediaStyle]}>
          {type === 'image' ? (
            <Image
              source={Images[source as keyof typeof Images]}
              style={styles.media}
              resizeMode="contain"
            />
          ) : (
            <Video
              source={Videos[source as keyof typeof Videos]}
              style={styles.media}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay
              isLooping
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaContainer: {
    position: 'relative',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
  closeButtonLandscape: {
    top: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
  },
});
