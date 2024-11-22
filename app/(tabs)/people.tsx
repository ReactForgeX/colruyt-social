import React from "react";
import {
  StyleSheet,
  View as RNView,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { MaterialIcons } from "@expo/vector-icons";

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
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.role}>{role}</Text>
            <Text style={styles.department}>{department}</Text>
            <RNView style={styles.statsRow}>
              <Text style={styles.stats}>{followers} followers</Text>
              <Text style={styles.statsDot}>·</Text>
              <Text style={styles.stats}>{following} following</Text>
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
    <RNView style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <RNView style={styles.header}>
          <Text style={styles.headerTitle}>Connections</Text>
        </RNView>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
          style={styles.tabView}
        />
      </SafeAreaView>
    </RNView>
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
  tabView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
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
    color: "#11181C",
    marginBottom: 2,
  },
  role: {
    fontSize: 14,
    color: "#687076",
    marginBottom: 2,
  },
  department: {
    fontSize: 13,
    color: "#687076",
    marginBottom: 6,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stats: {
    fontSize: 12,
    color: "#687076",
  },
  statsDot: {
    fontSize: 12,
    color: "#687076",
    marginHorizontal: 6,
  },
  followButton: {
    padding: 8,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginLeft: 12,
  },
  followingButton: {
    backgroundColor: "#ebebeb",
  },
  tabBar: {
    backgroundColor: "#fff",
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  indicator: {
    backgroundColor: "#00ab9e",
  },
  tabLabel: {
    textTransform: "none",
    fontWeight: "600",
  },
});
