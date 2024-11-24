import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedText } from './ThemedText';

type GradientHeaderProps = {
  title: string;
  height?: number;
  showProfileButton?: boolean;
};

export default function GradientHeader({ 
  title, 
  height = 56,
  showProfileButton = true
}: GradientHeaderProps) {
  const router = useRouter();

  const handleProfilePress = () => {
    router.push('/(profile)');
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
        <ThemedText style={styles.title}>{title}</ThemedText>
        {showProfileButton && (
          <TouchableOpacity
            style={styles.profileButton}
            onPress={handleProfilePress}
          >
            <MaterialIcons name="account-circle" size={32} color="#fff" />
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
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  profileButton: {
    padding: 8,
  },
});
