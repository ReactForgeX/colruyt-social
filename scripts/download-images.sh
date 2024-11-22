#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p assets/images

# Download sample images
curl -o assets/images/sustainability.jpg "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500"
curl -o assets/images/community.jpg "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=500"
curl -o assets/images/local-produce.jpg "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=500"
curl -o assets/images/store.jpg "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=500"
curl -o assets/images/team.jpg "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500"
curl -o assets/images/placeholder.jpg "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500"

echo "Images downloaded successfully!"
