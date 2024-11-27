import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type Option = {
  id: string;
  text: string;
};

type Poll = {
  id: string;
  question: string;
  subtitle: string;
  options: Option[];
  selectionType: 'single' | 'multiple';
};

const polls: Poll[] = [
  {
    id: 'food-vendor',
    question: "What's your opinion on new food vendor in the cafeteria?",
    subtitle: 'Choose your preffered option',
    options: [
      { id: '1', text: 'Great food' },
      { id: '2', text: 'Better' },
      { id: '3', text: 'Low quality' },
      { id: '4', text: 'Needs change' },
      { id: '5', text: 'Worst' },
    ],
    selectionType: 'single',
  },
  {
    id: 'seating',
    question: 'What seating improvements would you like to see?',
    subtitle: "Select all improvements that you'd like",
    options: [
      { id: '1', text: 'More individual seats' },
      { id: '2', text: 'Additional group tables' },
      { id: '3', text: 'Outdoor seating area' },
      { id: '4', text: 'High-top bar seating' },
    ],
    selectionType: 'multiple',
  },
];

export default function PollScreen() {
  const router = useRouter();
  const [activePollIndex, setActivePollIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string[] }>({
    'food-vendor': [],
    seating: [],
  });

  const handleOptionSelect = (pollId: string, optionId: string) => {
    const currentPoll = polls.find(poll => poll.id === pollId);
    if (!currentPoll) return;

    setSelectedOptions(prev => ({
      ...prev,
      [pollId]:
        currentPoll.selectionType === 'single'
          ? [optionId] // Single select: replace previous selection
          : prev[pollId].includes(optionId)
            ? prev[pollId].filter(id => id !== optionId) // Multiple select: toggle selection
            : [...prev[pollId], optionId],
    }));
  };

  const handleSubmit = () => {
    if (selectedOptions[polls[activePollIndex].id].length > 0) {
      if (activePollIndex < polls.length - 1) {
        setActivePollIndex(activePollIndex + 1);
      } else {
        router.back();
      }
    }
  };

  const currentPoll = polls[activePollIndex];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <LinearGradient
          colors={['#001F2D', '#003D4D', '#00435C', '#007B8C', '#00AB9E']}
          locations={[0, 0.25, 0.5, 0.75, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Poll {activePollIndex + 1}/2</ThemedText>
        </LinearGradient>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <ThemedView style={styles.card}>
            <ThemedText style={styles.question}>{currentPoll.question}</ThemedText>
            <ThemedText style={styles.subtitle}>{currentPoll.subtitle}</ThemedText>

            <View style={styles.optionsContainer}>
              {currentPoll.options.map(option => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionButton,
                    selectedOptions[currentPoll.id].includes(option.id) && styles.selectedOption,
                  ]}
                  onPress={() => {
                    handleOptionSelect(currentPoll.id, option.id);
                  }}>
                  <ThemedText
                    style={[
                      styles.optionText,
                      selectedOptions[currentPoll.id].includes(option.id) &&
                        styles.selectedOptionText,
                    ]}>
                    {option.text}
                  </ThemedText>
                  {selectedOptions[currentPoll.id].includes(option.id) && (
                    <MaterialIcons
                      name={
                        currentPoll.selectionType === 'single' ? 'radio-button-checked' : 'check'
                      }
                      size={20}
                      color="#00ab9e"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                selectedOptions[currentPoll.id].length > 0
                  ? styles.submitButtonActive
                  : styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={selectedOptions[currentPoll.id].length === 0}>
              <ThemedText style={styles.submitButtonText}>
                {activePollIndex < polls.length - 1 ? 'Next Poll' : 'Submit Response'}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#001824',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#ffffff',
  },
  selectedOption: {
    borderColor: '#00ab9e',
    backgroundColor: '#F0FDFA',
  },
  optionText: {
    fontSize: 16,
    color: '#334155',
  },
  selectedOptionText: {
    color: '#00ab9e',
    fontWeight: '500',
  },
  submitButton: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonActive: {
    backgroundColor: '#00ab9e',
  },
  submitButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
