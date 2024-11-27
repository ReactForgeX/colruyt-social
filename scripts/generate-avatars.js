const fs = require('fs');
const path = require('path');

// Create assets/avatars directory if it doesn't exist
const avatarsDir = path.join(__dirname, '..', 'assets', 'avatars');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// Create a simple SVG for each avatar
const colors = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#96CEB4', // Green
  '#FFEEAD', // Yellow
  '#D4A5A5', // Pink
  '#9FA8DA', // Purple
];

const createAvatarSVG = (initials, bgColor) => `
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="${bgColor}"/>
  <text x="100" y="120" font-family="Arial" font-size="80" fill="white" text-anchor="middle">${initials}</text>
</svg>
`;

const avatars = [
  { name: 'user1', initials: 'JD' },
  { name: 'user2', initials: 'JS' },
  { name: 'user3', initials: 'TE' },
  { name: 'user4', initials: 'SW' },
  { name: 'user5', initials: 'DC' },
  { name: 'user6', initials: 'AK' },
  { name: 'default', initials: '?' },
];

avatars.forEach((avatar, index) => {
  const svg = createAvatarSVG(avatar.initials, colors[index % colors.length]);
  fs.writeFileSync(path.join(avatarsDir, `${avatar.name}.svg`), svg.trim());
  console.log(`Created ${avatar.name}.svg`);
});
