import React from "react";
import {
  StyleSheet,
  View,
  SectionList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import GradientHeader from "@/components/GradientHeader";

// Define an Event type
type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
};

// Helper function to group events by relative dates
const groupEventsByDate = (events: Event[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const sections: { title: string; data: Event[] }[] = [
    { title: "Today", data: [] },
    { title: "Tomorrow", data: [] },
    { title: "This Week", data: [] },
    { title: "Later", data: [] },
  ];

  events.forEach(event => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate.getTime() === today.getTime()) {
      sections[0].data.push(event);
    } else if (eventDate.getTime() === tomorrow.getTime()) {
      sections[1].data.push(event);
    } else if (eventDate < nextWeek) {
      sections[2].data.push(event);
    } else {
      sections[3].data.push(event);
    }
  });

  return sections.filter(section => section.data.length > 0);
};

// Sample data for events
const eventsData: Event[] = [
  {
    id: "1",
    title: "Sustainability Workshop",
    date: new Date().toISOString().split('T')[0], // Today
    time: "09:00 - 17:00",
    location: "Colruyt Headquarters, Brussels",
    category: "Workshop",
    attendees: 45,
  },
  {
    id: "2",
    title: "Community Market Day",
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    time: "10:00 - 18:00",
    location: "Colruyt Store, Ghent",
    category: "Market",
    attendees: 120,
  },
  {
    id: "3",
    title: "Digital Innovation Talk",
    date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], // 3 days later
    time: "15:30 - 17:30",
    location: "Virtual Event",
    category: "Tech Talk",
    attendees: 89,
  },
  {
    id: "4",
    title: "Team Building Day",
    date: new Date(Date.now() + 86400000 * 10).toISOString().split('T')[0], // 10 days later
    time: "09:00 - 17:00",
    location: "Colruyt Sports Center",
    category: "Team Event",
    attendees: 75,
  },
  {
    id: "5",
    title: "Customer Experience Workshop",
    date: new Date(Date.now() + 86400000 * 15).toISOString().split('T')[0], // 15 days later
    time: "13:00 - 16:00",
    location: "Training Center, Antwerp",
    category: "Workshop",
    attendees: 35,
  },
];

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
}

function EventCard({
  title,
  date,
  time,
  location,
  category,
  attendees,
}: EventCardProps) {
  const [isInterested, setIsInterested] = React.useState(false);
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const handleInterestPress = () => {
    setIsInterested(!isInterested);
  };


  return (
    <View style={styles.cardContainer}>
      <ThemedView style={[styles.card]}>
        <View style={styles.cardHeader}>
          <View>
            <ThemedText style={styles.title}>{title}</ThemedText>
          </View>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.infoRow}>
            <MaterialIcons name="event" size={16} color="#666666" />
            <ThemedText style={styles.infoText}>
              {formattedDate} • {time}
            </ThemedText>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="location-on" size={16} color="#666666" />
            <ThemedText style={styles.infoText}>{location}</ThemedText>
          </View>
        </View>

        <View style={[styles.infoRow, styles.interestRow]}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={[
              styles.interestButton,
              isInterested && styles.interestedButton,
            ]}
            onPress={handleInterestPress}
          >
            <MaterialIcons
              name={isInterested ? "favorite" : "favorite-outline"}
              size={16}
              color={isInterested ? "#00ab9e" : "#666666"}
            />
            <ThemedText
              style={[
                styles.interestButtonText,
                isInterested && styles.interestedButtonText,
              ]}
            >
              {attendees} interested
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </View>
  );
}

export default function EventsScreen() {
  const sections = groupEventsByDate(eventsData);

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <GradientHeader title="Events & Announcements" />
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
        renderItem={({ item }) => (
          <EventCard
            title={item.title}
            date={item.date}
            time={item.time}
            location={item.location}
            category={item.category}
            attendees={item.attendees}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001824",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#eee",
  },
  scrollContent: {
    padding: 16,
    paddingRight: 0,
  },
  sectionHeader: {
    paddingVertical: 4,
    paddingRight: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#00AB9E",
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardContainer: {
    marginBottom: 16,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginRight: 0,
  },
  card: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: "#e5e5e5",
    padding: 16,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    overflow: "hidden",
  },
  cardHeader: {
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  cardContent: {
    gap: 8,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  interestRow: {
    marginTop: "auto",
    marginRight: -16,
    marginBottom: -16,
  },
  infoText: {
    fontSize: 14,
    color: "#666666",
    flex: 1,
  },
  interestButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 24,
    borderTopLeftRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  interestedButton: {
    backgroundColor: "#e6f7f6",
  },
  interestButtonText: {
    fontSize: 14,
    color: "#666666",
  },
  interestedButtonText: {
    color: "#00ab9e",
  },
});
