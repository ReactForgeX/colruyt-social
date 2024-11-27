import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import GradientHeader from "@/components/GradientHeader";
import { Images } from "@/constants/Images";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  datePosted: string;
  readTime: string;
  imageKey: keyof typeof Images;
};

type PolicyChange = {
  id: string;
  title: string;
  description: string;
  date: string;
  department: string;
};

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Welcome to Colruyt Social",
    excerpt: "Discover how our platform brings the Colruyt community together and enhances workplace communication...",
    category: "Community",
    datePosted: "May 15, 2024",
    readTime: "5 min read",
    imageKey: "image1",
  },
  {
    id: "2",
    title: "Sustainability at Colruyt",
    excerpt: "Learn about our latest initiatives for a greener future and sustainable business practices...",
    category: "Sustainability",
    datePosted: "May 14, 2024",
    readTime: "4 min read",
    imageKey: "image2",
  },
  {
    id: "3",
    title: "Employee Wellness Program Launch",
    excerpt: "Introducing our comprehensive wellness program designed to support physical and mental health...",
    category: "Health",
    datePosted: "May 13, 2024",
    readTime: "3 min read",
    imageKey: "image1",
  },
  {
    id: "4",
    title: "Digital Transformation Journey",
    excerpt: "Exploring our technological advancements and how they're reshaping customer experiences...",
    category: "Technology",
    datePosted: "May 12, 2024",
    readTime: "6 min read",
    imageKey: "image2",
  },
  {
    id: "5",
    title: "Community Outreach Success",
    excerpt: "Highlighting the positive impact of our recent community engagement initiatives...",
    category: "Community",
    datePosted: "May 11, 2024",
    readTime: "4 min read",
    imageKey: "image1",
  }
];

const recentPolicyChanges: PolicyChange[] = [
  {
    id: "1",
    title: "Updated Work from Home Policy",
    description: "New guidelines for hybrid work arrangements and flexible scheduling options...",
    date: "May 16, 2024",
    department: "HR",
  },
  {
    id: "2",
    title: "Sustainability Guidelines",
    description: "Updated environmental policies for reducing carbon footprint and promoting eco-friendly practices...",
    date: "May 15, 2024",
    department: "Operations",
  },
  {
    id: "3",
    title: "Employee Benefits Enhancement",
    description: "Expanded healthcare coverage and introduction of new wellness program benefits...",
    date: "May 14, 2024",
    department: "HR",
  },
  {
    id: "4",
    title: "Data Security Protocol Update",
    description: "Enhanced cybersecurity measures and updated data protection guidelines...",
    date: "May 13, 2024",
    department: "IT",
  },
  {
    id: "5",
    title: "Customer Service Standards",
    description: "Revised guidelines for ensuring exceptional customer experience across all channels...",
    date: "May 12, 2024",
    department: "Customer Service",
  },
  {
    id: "6",
    title: "Supply Chain Optimization",
    description: "New procedures for improving inventory management and delivery efficiency...",
    date: "May 11, 2024",
    department: "Logistics",
  }
];

const hotBlogPosts = blogPosts.slice(0, 5);

export { blogPosts };

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredContent = {
    blogs: searchQuery ? blogPosts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [],
    policies: searchQuery ? recentPolicyChanges.filter(policy =>
      policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.department.toLowerCase().includes(searchQuery.toLowerCase())
    ) : []
  };

  const renderBlogPost = (post: BlogPost) => (
    <TouchableOpacity 
      key={post.id} 
      style={styles.card}
      onPress={() => {
        console.log('Navigating to article:', post.id);
        router.push({
          pathname: '/article-detail',
          params: { id: post.id }
        });
      }}
    >
      <View style={styles.cardContent}>
        <View style={styles.postMeta}>
          <ThemedText style={styles.category}>{post.category}</ThemedText>
          <View style={styles.dot} />
          <ThemedText style={styles.date}>{post.datePosted}</ThemedText>
        </View>
        <ThemedText style={styles.title}>{post.title}</ThemedText>
        <ThemedText style={styles.excerpt} numberOfLines={2}>
          {post.excerpt}
        </ThemedText>
        <View style={styles.readMoreContainer}>
          <ThemedText style={styles.readTime}>{post.readTime}</ThemedText>
          <MaterialIcons name="arrow-forward" size={20} color="#00ab9e" />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPolicyChange = (policy: PolicyChange) => (
    <TouchableOpacity key={policy.id} style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.postMeta}>
          <ThemedText style={[styles.category, styles.policyCategory]}>{policy.department}</ThemedText>
          <View style={styles.dot} />
          <ThemedText style={styles.date}>{policy.date}</ThemedText>
        </View>
        <ThemedText style={styles.title}>{policy.title}</ThemedText>
        <ThemedText style={styles.excerpt} numberOfLines={2}>
          {policy.description}
        </ThemedText>
        <View style={styles.readMoreContainer}>
          <MaterialIcons name="arrow-forward" size={20} color="#00ab9e" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <GradientHeader title="Search" />
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={20} color="#666666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search blogs, policies & more ..."
            placeholderTextColor="#999999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <MaterialIcons
              name="close"
              size={20}
              color="#666666"
              onPress={() => setSearchQuery("")}
            />
          )}
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        {!searchQuery ? (
          <>
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>What's Hot</ThemedText>
              {hotBlogPosts.map(renderBlogPost)}
            </View>
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Recent Policy Changes</ThemedText>
              {recentPolicyChanges.map(renderPolicyChange)}
            </View>
          </>
        ) : (
          <>
            {filteredContent.blogs.length > 0 && (
              <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Blogs</ThemedText>
                {filteredContent.blogs.map(renderBlogPost)}
              </View>
            )}
            {filteredContent.policies.length > 0 && (
              <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Policies</ThemedText>
                {filteredContent.policies.map(renderPolicyChange)}
              </View>
            )}
            {filteredContent.blogs.length === 0 && filteredContent.policies.length === 0 && (
              <View style={styles.noResults}>
                <ThemedText style={styles.noResultsText}>No results found</ThemedText>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001824",
  },
  searchContainer: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333333",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#eee",
  },
  section: {
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    paddingLeft: 20,
    paddingRight: 40,
    paddingVertical: 8,
    backgroundColor: "#00ab9e",
    alignSelf: 'flex-start',
    borderTopRightRadius: 40,
  },
  card: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 2,
    borderBottomColor: "#f0f0f0",
  },
  cardContent: {
    padding: 16,
  },
  postMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: "#00ab9e",
    fontWeight: "500",
  },
  policyCategory: {
    color: "#7c4dff",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#666666",
    marginHorizontal: 8,
  },
  date: {
    fontSize: 14,
    color: "#666666",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
  },
  excerpt: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333333",
    marginBottom: 12,
  },
  readMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  readTime: {
    fontSize: 14,
    color: "#666666",
    marginRight: 8,
  },
  noResults: {
    padding: 32,
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 16,
    color: "#666666",
  },
});
