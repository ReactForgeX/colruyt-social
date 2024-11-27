import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GradientHeader from '@/components/GradientHeader';
import { ThemedText } from '@/components/ThemedText';
import { Avatars } from '@/constants/Avatars';
import { Images } from '@/constants/Images';

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
    id: '1',
    title: 'Welcome to Colruyt Social',
    excerpt:
      'Discover how our platform brings the Colruyt community together and enhances workplace communication...',
    category: 'Community',
    datePosted: 'May 15, 2024',
    readTime: '5 min read',
    imageKey: 'image1',
  },
  {
    id: '2',
    title: 'Sustainability at Colruyt',
    excerpt:
      'Learn about our latest initiatives for a greener future and sustainable business practices...',
    category: 'Sustainability',
    datePosted: 'May 14, 2024',
    readTime: '4 min read',
    imageKey: 'image2',
  },
  {
    id: '3',
    title: 'Employee Wellness Program Launch',
    excerpt:
      'Introducing our comprehensive wellness program designed to support physical and mental health...',
    category: 'Health',
    datePosted: 'May 13, 2024',
    readTime: '3 min read',
    imageKey: 'image1',
  },
  {
    id: '4',
    title: 'Digital Transformation Journey',
    excerpt:
      "Exploring our technological advancements and how they're reshaping customer experiences...",
    category: 'Technology',
    datePosted: 'May 12, 2024',
    readTime: '6 min read',
    imageKey: 'image2',
  },
  {
    id: '5',
    title: 'Community Outreach Success',
    excerpt: 'Highlighting the positive impact of our recent community engagement initiatives...',
    category: 'Community',
    datePosted: 'May 11, 2024',
    readTime: '4 min read',
    imageKey: 'image1',
  },
];

const recentPolicyChanges: PolicyChange[] = [
  {
    id: '1',
    title: 'Updated Work from Home Policy',
    description: 'New guidelines for hybrid work arrangements and flexible scheduling options...',
    date: 'May 16, 2024',
    department: 'HR',
  },
  {
    id: '2',
    title: 'Sustainability Guidelines',
    description:
      'Updated environmental policies for reducing carbon footprint and promoting eco-friendly practices...',
    date: 'May 15, 2024',
    department: 'Operations',
  },
  {
    id: '3',
    title: 'Employee Benefits Enhancement',
    description:
      'Expanded healthcare coverage and introduction of new wellness program benefits...',
    date: 'May 14, 2024',
    department: 'HR',
  },
  {
    id: '4',
    title: 'Data Security Protocol Update',
    description: 'Enhanced cybersecurity measures and updated data protection guidelines...',
    date: 'May 13, 2024',
    department: 'IT',
  },
  {
    id: '5',
    title: 'Customer Service Standards',
    description:
      'Revised guidelines for ensuring exceptional customer experience across all channels...',
    date: 'May 12, 2024',
    department: 'Customer Service',
  },
  {
    id: '6',
    title: 'Supply Chain Optimization',
    description: 'New procedures for improving inventory management and delivery efficiency...',
    date: 'May 11, 2024',
    department: 'Logistics',
  },
];

const hotBlogPosts = blogPosts.slice(0, 5);

const samplePeople = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Product Manager',
    location: 'Antwerp, Belgium',
    department: 'Digital Innovation',
    avatar: Avatars.default,
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Senior Developer',
    location: 'Brussels, Belgium',
    department: 'IT',
    avatar: Avatars.default,
  },
  {
    id: '3',
    name: 'Emma De Vries',
    role: 'UX Designer',
    location: 'Ghent, Belgium',
    department: 'Design',
    avatar: Avatars.default,
  },
  {
    id: '4',
    name: 'Lucas Peeters',
    role: 'Project Manager',
    location: 'Leuven, Belgium',
    department: 'Operations',
    avatar: Avatars.default,
  },
];

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'blogs' | 'policies' | 'people'>('blogs');
  const router = useRouter();

  const filteredContent = {
    blogs: searchQuery
      ? blogPosts.filter(
          post =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.category.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : blogPosts,
    policies: searchQuery
      ? recentPolicyChanges.filter(
          policy =>
            policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            policy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            policy.department.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : recentPolicyChanges,
    people: searchQuery
      ? samplePeople.filter(
          person =>
            person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            person.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            person.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
            person.location.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : samplePeople,
  };

  const renderBlogPost = (post: BlogPost) => (
    <TouchableOpacity key={post.id} onPress={() => {}} activeOpacity={1} style={styles.card}>
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
    <TouchableOpacity key={policy.id} onPress={() => {}} activeOpacity={1} style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.postMeta}>
          <ThemedText style={[styles.category, styles.policyCategory]}>
            {policy.department}
          </ThemedText>
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

  const renderPerson = (person: (typeof samplePeople)[0]) => (
    <TouchableOpacity
      key={person.id}
      onPress={() => {
        router.push(`/user-details?id=${person.id}`);
      }}
      activeOpacity={1}
      style={styles.personCard}>
      <Image source={person.avatar} style={styles.personAvatar} />
      <View style={styles.personInfo}>
        <ThemedText style={styles.personName}>{person.name}</ThemedText>
        <ThemedText style={styles.personRole}>{person.role}</ThemedText>
        <View style={styles.personLocation}>
          <MaterialIcons name="location-on" size={14} color="#666666" />
          <ThemedText style={styles.personDepartment}>{person.location}</ThemedText>
        </View>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#666666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
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
              onPress={() => {
                setSearchQuery('');
              }}
            />
          )}
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'blogs' && styles.activeTab]}
          onPress={() => {
            setActiveTab('blogs');
          }}>
          <ThemedText style={[styles.tabText, activeTab === 'blogs' && styles.activeTabText]}>
            Blogs
          </ThemedText>
          {filteredContent.blogs.length > 0 && (
            <View style={styles.badge}>
              <ThemedText style={styles.badgeText}>{filteredContent.blogs.length}</ThemedText>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'policies' && styles.activeTab]}
          onPress={() => {
            setActiveTab('policies');
          }}>
          <ThemedText style={[styles.tabText, activeTab === 'policies' && styles.activeTabText]}>
            Policies
          </ThemedText>
          {filteredContent.policies.length > 0 && (
            <View style={styles.badge}>
              <ThemedText style={styles.badgeText}>{filteredContent.policies.length}</ThemedText>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'people' && styles.activeTab]}
          onPress={() => {
            setActiveTab('people');
          }}>
          <ThemedText style={[styles.tabText, activeTab === 'people' && styles.activeTabText]}>
            People
          </ThemedText>
          {filteredContent.people.length > 0 && (
            <View style={styles.badge}>
              <ThemedText style={styles.badgeText}>{filteredContent.people.length}</ThemedText>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {activeTab === 'blogs' && filteredContent.blogs.map(renderBlogPost)}
        {activeTab === 'policies' && filteredContent.policies.map(renderPolicyChange)}
        {activeTab === 'people' && filteredContent.people.map(renderPerson)}
        {searchQuery && filteredContent[activeTab].length === 0 && (
          <View style={styles.noResults}>
            <ThemedText style={styles.noResultsText}>No results found</ThemedText>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001824',
  },
  searchContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333333',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#eee',
  },
  section: {
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    paddingLeft: 20,
    paddingRight: 40,
    paddingVertical: 8,
    backgroundColor: '#00ab9e',
    alignSelf: 'flex-start',
    borderTopRightRadius: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: '#00ab9e',
    fontWeight: '500',
  },
  policyCategory: {
    color: '#7c4dff',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#666666',
    marginHorizontal: 8,
  },
  date: {
    fontSize: 14,
    color: '#666666',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  excerpt: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333333',
    marginBottom: 12,
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  readTime: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  noResults: {
    padding: 32,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666666',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#00ab9e',
  },
  tabText: {
    fontSize: 14,
    color: '#666666',
  },
  activeTabText: {
    color: '#00ab9e',
    fontWeight: '600',
  },
  badge: {
    backgroundColor: '#00ab9e',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  personCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  personAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000000',
  },
  personRole: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  personLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  personDepartment: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
});

export default SearchScreen;
