import React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import GradientHeader from "@/components/GradientHeader";

// Sample data for events - in a real app, this would come from an API
const eventsData = [
  {
    id: "1",
    title: "Sustainability Workshop",
    date: "2024-02-15",
    time: "14:00 - 16:00",
    location: "Colruyt Headquarters, Brussels",
    category: "Workshop",
    attendees: 45,
  },
  {
    id: "2",
    title: "Community Market Day",
    date: "2024-02-20",
    time: "10:00 - 18:00",
    location: "Colruyt Store, Ghent",
    category: "Market",
    attendees: 120,
  },
  {
    id: "3",
    title: "Digital Innovation Talk",
    date: "2024-02-25",
    time: "15:30 - 17:30",
    location: "Virtual Event",
    category: "Tech Talk",
    attendees: 89,
  },
  {
    id: "4",
    title: "Team Building Day",
    date: "2024-03-01",
    time: "09:00 - 17:00",
    location: "Colruyt Sports Center",
    category: "Team Event",
    attendees: 75,
  },
  {
    id: "5",
    title: "Customer Experience Workshop",
    date: "2024-03-05",
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
      <ThemedView style={styles.card}>
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
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <GradientHeader title="Events" />
      <FlatList
        data={eventsData}
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
