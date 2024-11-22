const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const avatarsDir = path.join(__dirname, '..', 'assets', 'avatars');

// Create colored circles with initials
const colors = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#96CEB4', // Green
  '#FFEEAD', // Yellow
  '#D4A5A5', // Pink
  '#9FA8DA'  // Purple
];

const avatars = [
  { name: 'user1', initials: 'JD' },
  { name: 'user2', initials: 'JS' },
  { name: 'user3', initials: 'TE' },
  { name: 'user4', initials: 'SW' },
  { name: 'user5', initials: 'DC' },
  { name: 'user6', initials: 'AK' },
  { name: 'default', initials: '?' }
];

async function generateAvatar(name, initials, color) {
  const size = 200;
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="${color}"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial" 
        font-size="80" 
        fill="white" 
        text-anchor="middle" 
        dy=".3em">${initials}</text>
    </svg>
  `;

  const outputPath = path.join(avatarsDir, `${name}.png`);
  
  try {
    await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`Created ${name}.png`);
  } catch (error) {
    console.error(`Error creating ${name}.png:`, error);
  }
}

async function main() {
  // Create directory if it doesn't exist
  if (!fs.existsSync(avatarsDir)) {
    fs.mkdirSync(avatarsDir, { recursive: true });
  }

  // Generate all avatars
  for (let i = 0; i < avatars.length; i++) {
    const { name, initials } = avatars[i];
    const color = colors[i % colors.length];
    await generateAvatar(name, initials, color);
  }
}

main().catch(console.error);
