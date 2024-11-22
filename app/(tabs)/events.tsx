import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Images } from "@/constants/Images";

// Sample data for events - in a real app, this would come from an API
const eventsData = [
  {
    id: "1",
    title: "Sustainability Workshop",
    date: "2024-02-15",
    time: "14:00 - 16:00",
    location: "Colruyt Headquarters, Brussels",
    description:
      "Join us for an interactive workshop on sustainable practices in retail. Learn about our environmental initiatives and how you can contribute.",
    imageKey: "team",
    attendees: 45,
    category: "Workshop",
  },
  {
    id: "2",
    title: "Community Market Day",
    date: "2024-02-20",
    time: "10:00 - 18:00",
    location: "Colruyt Store, Ghent",
    description:
      "A special market day featuring local producers and sustainable products. Meet our partners and discover new eco-friendly products.",
    imageKey: "team",
    attendees: 120,
    category: "Market",
  },
  {
    id: "3",
    title: "Digital Innovation Talk",
    date: "2024-02-25",
    time: "15:30 - 17:30",
    location: "Virtual Event",
    description:
      "Explore the future of retail technology with our tech leaders. Learn about upcoming digital initiatives and innovation projects.",
    imageKey: "team",
    attendees: 89,
    category: "Tech Talk",
  },
  {
    id: "4",
    title: "Team Building Day",
    date: "2024-03-01",
    time: "09:00 - 17:00",
    location: "Colruyt Sports Center",
    description:
      "A fun-filled day of team activities, games, and bonding. All departments welcome!",
    imageKey: "team",
    attendees: 75,
    category: "Team Event",
  },
  {
    id: "5",
    title: "Customer Experience Workshop",
    date: "2024-03-05",
    time: "13:00 - 16:00",
    location: "Training Center, Antwerp",
    description:
      "Learn about the latest customer service best practices and share your experiences with colleagues.",
    imageKey: "team",
    attendees: 35,
    category: "Workshop",
  },
];

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageKey: keyof typeof Images;
  attendees: number;
  category: string;
  onPress?: () => void;
}

function EventCard({
  title,
  date,
  time,
  location,
  description,
  imageKey,
  attendees,
  category,
  onPress,
}: EventCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView style={styles.card}>
        <Image source={Images[imageKey]} style={styles.eventImage} />
        <View style={styles.categoryBadge}>
          <ThemedText style={styles.categoryText}>{category}</ThemedText>
        </View>
        <View style={styles.cardContent}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <View style={styles.infoRow}>
            <MaterialIcons name="event" size={16} color="#666" />
            <ThemedText style={styles.infoText}>{formattedDate}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="access-time" size={16} color="#666" />
            <ThemedText style={styles.infoText}>{time}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="location-on" size={16} color="#666" />
            <ThemedText style={styles.infoText}>{location}</ThemedText>
          </View>
          <ThemedText style={styles.description} numberOfLines={2}>
            {description}
          </ThemedText>
          <View style={styles.footer}>
            <View style={styles.attendees}>
              <MaterialIcons name="people" size={16} color="#666" />
              <ThemedText style={styles.attendeesText}>
                {attendees} attending
              </ThemedText>
            </View>
            <TouchableOpacity style={styles.joinButton}>
              <ThemedText style={styles.joinButtonText}>Join Event</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

export default function EventsScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.headerTitle}>Events</ThemedText>
        </ThemedView>
        <FlatList
          data={eventsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard
              title={item.title}
              date={item.date}
              time={item.time}
              location={item.location}
              description={item.description}
              imageKey={item.imageKey}
              attendees={item.attendees}
              category={item.category}
            />
          )}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#00ab9e",
  },
  header: {
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    backgroundColor: "#00ab9e",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  list: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  categoryBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0, 171, 158, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#11181C",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#687076",
  },
  description: {
    fontSize: 14,
    color: "#687076",
    marginVertical: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  attendees: {
    flexDirection: "row",
    alignItems: "center",
  },
  attendeesText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#687076",
  },
  joinButton: {
    backgroundColor: "#00ab9e",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  joinButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
