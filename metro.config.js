// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Add support for SVG files
const { assetExts, sourceExts } = config.resolver;
config.resolver.assetExts = [...assetExts, 'svg'];
config.resolver.sourceExts = [...sourceExts];

module.exports = config;
