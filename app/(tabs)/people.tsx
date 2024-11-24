import React, { useState } from "react";
import {
  StyleSheet,
  View as RNView,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import GradientHeader from "@/components/GradientHeader";

// Sample data - in a real app, this would come from an API
const peopleData = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Product Manager",
    department: "Digital Innovation",
    followers: 245,
    following: 189,
    isFollowing: false,
  },
  {
    id: "2",
    name: "Thomas De Vries",
    role: "Store Manager",
    department: "Retail Operations",
    followers: 178,
    following: 134,
    isFollowing: true,
  },
  {
    id: "3",
    name: "Marie Dubois",
    role: "Sustainability Lead",
    department: "Corporate Responsibility",
    followers: 312,
    following: 156,
    isFollowing: false,
  },
];

interface PersonCardProps {
  name: string;
  role: string;
  department: string;
  followers: number;
  following: number;
  isFollowing: boolean;
  onPress?: () => void;
  onFollowPress?: () => void;
}

function PersonCard({
  name,
  role,
  department,
  followers,
  following,
  isFollowing,
  onPress,
  onFollowPress,
}: PersonCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <RNView style={styles.cardRow}>
        <RNView style={styles.avatar}>
          <MaterialIcons name="person" size={24} color="#999" />
        </RNView>
        <RNView style={styles.cardContent}>
          <RNView style={styles.textContainer}>
            <ThemedText style={styles.name}>{name}</ThemedText>
            <ThemedText style={styles.role}>{role}</ThemedText>
            <ThemedText style={styles.department}>{department}</ThemedText>
            <RNView style={styles.statsRow}>
              <ThemedText style={styles.stats}>{followers} followers</ThemedText>
              <ThemedText style={styles.statsDot}>·</ThemedText>
              <ThemedText style={styles.stats}>{following} following</ThemedText>
            </RNView>
          </RNView>
        </RNView>
        <TouchableOpacity
          style={[styles.followButton, isFollowing && styles.followingButton]}
          onPress={onFollowPress}
        >
          <MaterialIcons
            name={isFollowing ? "person-remove" : "person-add"}
            size={20}
            color={isFollowing ? "#687076" : "#00ab9e"}
          />
        </TouchableOpacity>
      </RNView>
    </TouchableOpacity>
  );
}

function PeopleList({ data }: { data: typeof peopleData }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PersonCard
          name={item.name}
          role={item.role}
          department={item.department}
          followers={item.followers}
          following={item.following}
          isFollowing={item.isFollowing}
          onFollowPress={() => {
            // Handle follow/unfollow
          }}
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const DiscoverRoute = () => <PeopleList data={peopleData} />;

const FollowingRoute = () => (
  <PeopleList data={peopleData.filter((person) => person.isFollowing)} />
);

const FollowersRoute = () => <PeopleList data={peopleData} />;

export default function PeopleScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "discover", title: "Discover" },
    { key: "following", title: "Following" },
    { key: "followers", title: "Followers" },
  ]);

  const renderScene = SceneMap({
    discover: DiscoverRoute,
    following: FollowingRoute,
    followers: FollowersRoute,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
      activeColor="#00ab9e"
      inactiveColor="#666"
    />
  );

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <GradientHeader title="Connections" />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        style={styles.tabView}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001824",
  },
  tabView: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  tabBar: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "none",
  },
  indicator: {
    backgroundColor: "#00ab9e",
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  cardRow: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 2,
  },
  department: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stats: {
    fontSize: 14,
    color: "#666666",
  },
  statsDot: {
    fontSize: 14,
    color: "#666666",
    marginHorizontal: 6,
  },
  followButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  followingButton: {
    backgroundColor: "#e5e5e5",
  },
});
