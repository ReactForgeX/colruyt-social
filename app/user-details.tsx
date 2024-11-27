import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GradientHeader from '@/components/GradientHeader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Avatars } from '@/constants/Avatars';
import { Colors } from '@/constants/Colors';

const COLRUYT_TEAL = Colors.light.tint;

export default function UserDetailsScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <GradientHeader title="User details" showBackButton />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <ThemedView style={styles.profileSection}>
          <Image source={Avatars.default} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <ThemedText style={styles.name}>Sarah Johnson</ThemedText>
            <ThemedText style={styles.role}>Product Manager</ThemedText>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={16} color="#666666" />
              <ThemedText style={styles.department}>Antwerp, Belgium</ThemedText>
            </View>
          </View>
        </ThemedView>

        {/* About Section */}
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="person" size={24} color={COLRUYT_TEAL} />
            <ThemedText style={styles.sectionTitle}>About</ThemedText>
          </View>
          <View>
            <ThemedText style={styles.aboutDescription}>
              Experienced product manager with a passion for user-centric design and digital
              innovation. Leading product strategy and development at Colruyt Group.
            </ThemedText>
          </View>
        </ThemedView>

        {/* Stats Card */}
        <ThemedView style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <MaterialIcons name="work" size={24} color={COLRUYT_TEAL} />
              <View style={styles.statContent}>
                <ThemedText style={styles.statValue}>3 Years</ThemedText>
                <ThemedText style={styles.statLabel}>at Colruyt</ThemedText>
              </View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <MaterialIcons name="article" size={24} color={COLRUYT_TEAL} />
              <View style={styles.statContent}>
                <ThemedText style={styles.statValue}>85 Posts</ThemedText>
                <ThemedText style={styles.statLabel}>Shared</ThemedText>
              </View>
            </View>
          </View>
        </ThemedView>

        {/* Awards Section */}
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="emoji-events" size={24} color={COLRUYT_TEAL} />
            <ThemedText style={styles.sectionTitle}>Awards & Achievements</ThemedText>
          </View>
          <View>
            {/* 2024 Awards */}
            <View style={styles.yearGroup}>
              <View style={styles.yearHeader}>
                <ThemedText style={styles.yearText}>2024</ThemedText>
              </View>
              <View style={styles.awardList}>
                <View style={styles.awardItem}>
                  <View style={[styles.iconContainer, styles.goldIcon]}>
                    <MaterialIcons name="star" size={28} color="#FFD700" />
                  </View>
                  <View style={styles.awardContent}>
                    <ThemedText style={styles.awardTitle}>Innovation Award</ThemedText>
                    <View style={styles.awardBullet}>
                      <View style={styles.bullet} />
                      <ThemedText style={styles.awardMonth}>February</ThemedText>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* 2023 Awards */}
            <View style={styles.yearGroup}>
              <View style={styles.yearHeader}>
                <ThemedText style={styles.yearText}>2023</ThemedText>
              </View>
              <View style={styles.awardList}>
                <View style={styles.awardItem}>
                  <View style={[styles.iconContainer, styles.silverIcon]}>
                    <MaterialIcons name="psychology" size={28} color="#C0C0C0" />
                  </View>
                  <View style={styles.awardContent}>
                    <ThemedText style={styles.awardTitle}>Best Product Launch</ThemedText>
                    <View style={styles.awardBullet}>
                      <View style={styles.bullet} />
                      <ThemedText style={styles.awardMonth}>November</ThemedText>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#eee',
  },
  scrollContent: {
    padding: 16,
  },
  profileSection: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000000',
  },
  role: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  department: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: Colors.light.tint,
  },

  aboutDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666666',
  },
  statsCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statContent: {
    marginLeft: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e5e5',
    marginHorizontal: 16,
  },
  yearGroup: {
    marginBottom: 15,
    marginTop: 12,
  },
  yearHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yearText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.tint,
  },

  awardList: {
    gap: 16,
  },
  awardItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  goldIcon: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  silverIcon: {
    backgroundColor: 'rgba(192, 192, 192, 0.1)',
  },
  awardContent: {
    flex: 1,
  },
  awardTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#000000',
  },
  awardBullet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#666666',
    marginRight: 8,
  },
  awardMonth: {
    fontSize: 14,
    color: '#666666',
  },
});
