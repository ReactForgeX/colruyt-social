import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import GradientHeader from '@/components/GradientHeader';

const COLRUYT_TEAL = '#00ab9e';

export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [eventsEnabled, setEventsEnabled] = useState(true);

  const handleLogout = () => {
    router.replace('/');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <GradientHeader 
        title="Settings" 
        showBackButton 
        showSettingsButton={false} 
      />
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="notifications" size={24} color={COLRUYT_TEAL} />
            <ThemedText style={styles.sectionTitle}>Notifications</ThemedText>
          </View>
          
          <View style={styles.notificationItem}>
            <View style={styles.notificationContent}>
              <ThemedText style={styles.notificationText}>Push Notifications</ThemedText>
              <ThemedText style={styles.notificationDescription}>Get notified about new posts and updates</ThemedText>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#767577', true: COLRUYT_TEAL }}
              thumbColor={'#f4f3f4'}
            />
          </View>

          <View style={styles.notificationItem}>
            <View style={styles.notificationContent}>
              <ThemedText style={styles.notificationText}>Event Reminders</ThemedText>
              <ThemedText style={styles.notificationDescription}>Get notified about upcoming events</ThemedText>
            </View>
            <Switch
              value={eventsEnabled}
              onValueChange={setEventsEnabled}
              trackColor={{ false: '#767577', true: COLRUYT_TEAL }}
              thumbColor={'#f4f3f4'}
            />
          </View>
        </ThemedView>

        <ThemedView style={styles.section}>
          
          <TouchableOpacity 
            style={styles.settingItem}
            activeOpacity={0.7}
          >
            <MaterialIcons name="privacy-tip" size={24} color={COLRUYT_TEAL} />
            <View style={styles.settingContent}>
              <ThemedText style={styles.settingText}>Privacy</ThemedText>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={COLRUYT_TEAL} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            activeOpacity={0.7}
          >
            <MaterialIcons name="help" size={24} color={COLRUYT_TEAL} />
            <View style={styles.settingContent}>
              <ThemedText style={styles.settingText}>Help & Support</ThemedText>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={COLRUYT_TEAL} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            activeOpacity={0.7}
          >
            <MaterialIcons name="feedback" size={24} color={COLRUYT_TEAL} />
            <View style={styles.settingContent}>
              <ThemedText style={styles.settingText}>Send Feedback</ThemedText>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={COLRUYT_TEAL} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            activeOpacity={0.7}
          >
            <MaterialIcons name="info" size={24} color={COLRUYT_TEAL} />
            <View style={styles.settingContent}>
              <ThemedText style={styles.settingText}>About</ThemedText>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={COLRUYT_TEAL} />
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={[styles.section, styles.dangerSection]}>
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <MaterialIcons name="logout" size={24} color="#ff4444" />
            <View style={styles.settingContent}>
              <ThemedText style={[styles.settingText, styles.logoutText]}>Logout</ThemedText>
            </View>
          </TouchableOpacity>
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
  section: {
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    color: COLRUYT_TEAL,
  },
  // Notification section styles
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  notificationContent: {
    flex: 1,
    marginRight: 16,
  },
  notificationText: {
    color: '#000',
    fontSize: 16,
  },
  notificationDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  // Other settings styles
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  settingContent: {
    flex: 1,
    marginHorizontal: 16,
  },
  settingText: {
    color: '#000',
    fontSize: 16,
  },
  dangerSection: {
    marginTop: 40,
  },
  logoutText: {
    color: '#ff4444',
  },
});
