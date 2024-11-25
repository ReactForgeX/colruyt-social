import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedText } from './ThemedText';

type GradientHeaderProps = {
  title: string;
  height?: number;
  showSettingsButton?: boolean;
  showBackButton?: boolean;
};

export default function GradientHeader({ 
  title, 
  height = 56,
  showSettingsButton = true,
  showBackButton = false
}: GradientHeaderProps) {
  const router = useRouter();

  const handleSettingsPress = () => {
    router.push('/settings');
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <LinearGradient
      colors={[
        '#001F2D',
        '#003D4D',
        '#00435C',
        '#007B8C',
        '#00AB9E',
      ]}
      locations={[0, 0.25, 0.5, 0.75, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradient, { height }]}
    >
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          {showBackButton && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
            >
              <MaterialIcons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>
          )}
          <ThemedText style={[styles.title, showBackButton && styles.titleWithBack]}>{title}</ThemedText>
        </View>
        {showSettingsButton && (
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={handleSettingsPress}
          >
            <MaterialIcons name="settings" size={28} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  titleWithBack: {
    marginLeft: 16,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  settingsButton: {
    padding: 8,
  },
});
