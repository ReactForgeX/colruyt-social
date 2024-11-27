import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GradientHeader from '@/components/GradientHeader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Avatars } from '@/constants/Avatars';
import { Colors } from '@/constants/Colors';

const COLRUYT_TEAL = Colors.light.tint;

export default function MeScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <GradientHeader title="Profile" showSettingsButton />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <ThemedView style={styles.profileSection}>
          <Image source={Avatars.default} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <ThemedText style={styles.name}>John Doe</ThemedText>
            <ThemedText style={styles.role}>Senior Software Engineer</ThemedText>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={16} color={Colors.light.icon} />
              <ThemedText style={styles.department}>Brussels, Belgium</ThemedText>
            </View>
          </View>
        </ThemedView>

        {/* About Section */}
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="person" size={24} color={COLRUYT_TEAL} />
            <ThemedText style={styles.sectionTitle}>About</ThemedText>
          </View>
          <View style={styles.sectionContent}>
            <ThemedText style={styles.aboutDescription}>
              Passionate software engineer focused on building innovative solutions for Colruyt
              Group's digital transformation.
            </ThemedText>
          </View>
        </ThemedView>

        {/* Stats Card */}
        <ThemedView style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <MaterialIcons name="work" size={24} color={COLRUYT_TEAL} />
              <View style={styles.statContent}>
                <ThemedText style={styles.statValue}>5 Years</ThemedText>
                <ThemedText style={styles.statLabel}>at Colruyt</ThemedText>
              </View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <MaterialIcons name="article" size={24} color={COLRUYT_TEAL} />
              <View style={styles.statContent}>
                <ThemedText style={styles.statValue}>127 Posts</ThemedText>
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
          <View style={styles.sectionContent}>
            {/* 2024 Awards */}
            <View style={styles.yearGroup}>
              <View style={styles.yearHeader}>
                <ThemedText style={styles.yearText}>2024</ThemedText>
                <View style={styles.yearLine} />
              </View>
              <View style={styles.awardList}>
                <View style={styles.awardItem}>
                  <View style={[styles.iconContainer, styles.goldIcon]}>
                    <MaterialIcons name="star" size={28} color="#FFD700" />
                  </View>
                  <View style={styles.awardContent}>
                    <ThemedText style={styles.awardTitle}>Employee of the Month</ThemedText>
                    <View style={styles.awardBullet}>
                      <View style={styles.bullet} />
                      <ThemedText style={styles.awardMonth}>March</ThemedText>
                    </View>
                  </View>
                </View>
                <View style={styles.awardItem}>
                  <View style={[styles.iconContainer, styles.goldIcon]}>
                    <MaterialIcons name="psychology" size={28} color="#FFD700" />
                  </View>
                  <View style={styles.awardContent}>
                    <ThemedText style={styles.awardTitle}>Innovation Champion</ThemedText>
                    <View style={styles.awardBullet}>
                      <View style={styles.bullet} />
                      <ThemedText style={styles.awardMonth}>January</ThemedText>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* 2023 Awards */}
            <View style={styles.yearGroup}>
              <View style={styles.yearHeader}>
                <ThemedText style={styles.yearText}>2023</ThemedText>
                <View style={styles.yearLine} />
              </View>
              <View style={styles.awardList}>
                <View style={styles.awardItem}>
                  <View style={[styles.iconContainer, styles.silverIcon]}>
                    <MaterialIcons name="military-tech" size={28} color="#C0C0C0" />
                  </View>
                  <View style={styles.awardContent}>
                    <ThemedText style={styles.awardTitle}>Best Team Lead</ThemedText>
                    <View style={styles.awardBullet}>
                      <View style={styles.bullet} />
                      <ThemedText style={styles.awardMonth}>December</ThemedText>
                    </View>
                  </View>
                </View>
                <View style={styles.awardItem}>
                  <View style={[styles.iconContainer, styles.silverIcon]}>
                    <MaterialIcons name="lightbulb" size={28} color="#C0C0C0" />
                  </View>
                  <View style={styles.awardContent}>
                    <ThemedText style={styles.awardTitle}>Process Improvement Award</ThemedText>
                    <View style={styles.awardBullet}>
                      <View style={styles.bullet} />
                      <ThemedText style={styles.awardMonth}>August</ThemedText>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* 2022 Awards */}
            <View style={styles.yearGroup}>
              <View style={styles.yearHeader}>
                <ThemedText style={styles.yearText}>2022</ThemedText>
                <View style={styles.yearLine} />
              </View>
              <View style={styles.awardList}>
                <View style={styles.awardItem}>
                  <View style={[styles.iconContainer, styles.bronzeIcon]}>
                    <MaterialIcons name="workspace-premium" size={28} color="#CD7F32" />
                  </View>
                  <View style={styles.awardContent}>
                    <ThemedText style={styles.awardTitle}>Best Team Player</ThemedText>
                    <View style={styles.awardBullet}>
                      <View style={styles.bullet} />
                      <ThemedText style={styles.awardMonth}>October</ThemedText>
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
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#eee',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileSection: {
    marginTop: 20,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
    color: Colors.light.text,
  },
  role: {
    fontSize: 16,
    color: Colors.light.icon,
    marginBottom: 2,
  },
  department: {
    fontSize: 14,
    color: Colors.light.icon,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  section: {
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
    color: COLRUYT_TEAL,
  },
  sectionContent: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
    color: Colors.light.text,
  },
  award: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  awardInfo: {
    marginLeft: 12,
    flex: 1,
  },

  awardDate: {
    fontSize: 14,
    color: Colors.light.icon,
  },
  aboutDescription: {
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 20,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statContent: {
    marginLeft: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.light.icon,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#ccc',
    marginHorizontal: 12,
  },
  statsCard: {
    marginTop: 15,
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  divider: {
    height: 1,
    marginVertical: 15,
  },
  yearGroup: {
    marginBottom: 20,
  },
  yearHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  yearText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLRUYT_TEAL,
    marginRight: 12,
  },
  yearLine: {
    flex: 1,
    height: 1,
    opacity: 0.5,
  },
  awardList: {
    marginLeft: 8,
  },
  awardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: '#fff',
    paddingVertical: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
    borderWidth: 2,
  },
  goldIcon: {
    backgroundColor: '#FFFAF0',
    borderColor: '#FFD700',
  },
  silverIcon: {
    backgroundColor: '#F8F8F8',
    borderColor: '#C0C0C0',
  },
  bronzeIcon: {
    backgroundColor: '#FDF5E6',
    borderColor: '#CD7F32',
  },
  awardContent: {
    flex: 1,
    marginLeft: 12,
  },
  awardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  awardBullet: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  bullet: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.light.icon,
    marginRight: 6,
  },
  awardMonth: {
    fontSize: 13,
    color: Colors.light.icon,
  },
});
