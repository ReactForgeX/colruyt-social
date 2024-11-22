export const Images = {
  // Blog post images
  sustainability: require('../assets/images/sustainability.jpg'),
  community: require('../assets/images/community.jpg'),
  localProduce: require('../assets/images/local-produce.jpg'),
  store: require('../assets/images/store.jpg'),
  team: require('../assets/images/team.jpg'),
  
  // Default placeholder
  placeholder: require('../assets/images/placeholder.jpg'),
} as const;

export type ImageKey = keyof typeof Images;
