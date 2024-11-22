#!/bin/bash

# Create videos directory if it doesn't exist
mkdir -p assets/videos

# Download sample videos (using small sample videos for development)
curl -o assets/videos/store-walkthrough.mp4 "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
curl -o assets/videos/community-event.mp4 "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
curl -o assets/videos/sustainability-initiative.mp4 "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"

echo "Videos downloaded successfully!"
