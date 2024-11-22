export const Videos = {
  // Sample videos
  storeWalkthrough: require('../assets/videos/store-walkthrough.mp4'),
  communityEvent: require('../assets/videos/community-event.mp4'),
  sustainabilityInitiative: require('../assets/videos/sustainability-initiative.mp4'),
} as const;

export type VideoKey = keyof typeof Videos;
