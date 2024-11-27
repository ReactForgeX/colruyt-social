export const Images = {
  // Blog post images
  sustainability: require('../assets/images/sustainability.jpg'),
  community: require('../assets/images/community.jpg'),
  localProduce: require('../assets/images/local-produce.jpg'),
  store: require('../assets/images/store.jpg'),
  team: require('../assets/images/team.jpg'),

  // Default images
  placeholder: require('../assets/images/placeholder.jpg'),
  default: require('../assets/images/placeholder.jpg'),
  image1: require('../assets/images/sustainability.jpg'),
  image2: require('../assets/images/store.jpg'),

  // Profile images
  user1: require('../assets/images/placeholder.jpg'),
  user2: require('../assets/images/placeholder.jpg'),
  user3: require('../assets/images/placeholder.jpg'),
  user4: require('../assets/images/placeholder.jpg'),
  user5: require('../assets/images/placeholder.jpg'),
} as const;

export type ImageKey = keyof typeof Images;
