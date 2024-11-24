import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions, Image, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import { SvgXml } from 'react-native-svg';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const { width, height } = Dimensions.get('window');
const ORBIT_RADIUS = width * 0.45;
const LOGO_SIZE = width * 0.14; 
const MAIN_LOGO_SIZE = width * 1.4; 

// Fixed positions for partner logos in straight lines
const PARTNER_POSITIONS = [
  // Top line (5 logos)
  { angle: 90, distance: ORBIT_RADIUS * 0.7 },  
  { angle: 90, distance: ORBIT_RADIUS * 0.7 },  
  { angle: 90, distance: ORBIT_RADIUS * 0.7 },  
  { angle: 90, distance: ORBIT_RADIUS * 0.7 },  
  { angle: 90, distance: ORBIT_RADIUS * 0.7 },  
  
  // Bottom line (5 logos)
  { angle: 270, distance: ORBIT_RADIUS * 0.7 }, 
  { angle: 270, distance: ORBIT_RADIUS * 0.7 }, 
  { angle: 270, distance: ORBIT_RADIUS * 0.7 }, 
  { angle: 270, distance: ORBIT_RADIUS * 0.7 }, 
  { angle: 270, distance: ORBIT_RADIUS * 0.7 }, 
];

// Partner logos with fixed positions
const partnerLogos = [
  { source: require('../assets/images/partner1.webp'), ...PARTNER_POSITIONS[0] },
  { source: require('../assets/images/partner2.webp'), ...PARTNER_POSITIONS[1] },
  { source: require('../assets/images/partner3.webp'), ...PARTNER_POSITIONS[2] },
  { source: require('../assets/images/partner4.webp'), ...PARTNER_POSITIONS[3] },
  { source: require('../assets/images/partner5.webp'), ...PARTNER_POSITIONS[4] },
  { source: require('../assets/images/partner6.webp'), ...PARTNER_POSITIONS[5] },
  { source: require('../assets/images/partner7.webp'), ...PARTNER_POSITIONS[6] },
  { source: require('../assets/images/partner8.webp'), ...PARTNER_POSITIONS[7] },
  { source: require('../assets/images/partner9.webp'), ...PARTNER_POSITIONS[8] },
  { source: require('../assets/images/partner10.webp'), ...PARTNER_POSITIONS[9] },
];

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

// Colruyt logo SVG string
const colruytLogoSvg = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 300 280" enable-background="new 0 0 300 280" xml:space="preserve">
   <g id="Symbols">
      <g id="header_x2F_desktop_x2F_alg" transform="translate(-151.000000, -26.000000)">
         <g id="Page-1" transform="translate(151.000000, 26.000000)">
            <path id="Fill-1" fill="#fff" d="M102.45,148.02c-0.38-0.09-2.26-0.45-4.59-0.45c-2.53,0-8.4,0.88-8.4,9.03v4.19c0,8.4,6.43,9.03,8.4,9.03c2.13,0,4.05-0.32,4.62-0.48c0.25-0.09,0.84-0.27,0.84-0.95v-1.9c0-0.57-0.34-0.91-0.88-0.91h-0.07c-0.81,0.07-2.85,0.23-4.44,0.23c-2.58,0-3.82-1.65-3.82-5.02v-4.19c0-3.42,1.22-5.02,3.82-5.02c1.36,0,3.17,0.11,4.44,0.23h0.07c0.54,0,0.88-0.34,0.88-0.91v-1.9C103.31,148.29,102.74,148.11,102.45,148.02"/>
            <path id="Fill-3" fill="#fff" d="M110.16,156.76c0-3.55,1.18-5.14,3.82-5.14c2.65,0,3.85,1.58,3.85,5.14v3.85c0,3.55-1.18,5.14-3.85,5.14c-2.65,0-3.82-1.58-3.82-5.14V156.76z M113.99,147.57c-5.45,0-8.46,3.26-8.46,9.21v3.85c0,5.93,3.01,9.21,8.46,9.21s8.46-3.28,8.46-9.21v-3.85C122.45,150.83,119.44,147.57,113.99,147.57L113.99,147.57z"/>
            <path id="Fill-5" fill="#fff" d="M137.38,169.41c0.5-0.09,0.81-0.29,0.81-0.91v-1.83c0-0.5-0.38-0.88-0.88-0.88h-5.25c-1.52,0-1.92-0.45-1.92-2.15v-15c0-0.48-0.41-0.88-0.88-0.88h-2.83c-0.5,0-0.88,0.41-0.88,0.86v15c0,5.45,3.69,6.15,6.92,6.15C134.04,169.81,136.52,169.61,137.38,169.41"/>
            <path id="Fill-7" fill="#fff" d="M144.9,151.66c0.63-0.05,1.74-0.09,2.22-0.09c2.76,0,3.98,0.84,3.98,2.74v0.25c0,2.22-1.04,2.99-3.98,2.99c-0.38,0-1.58-0.05-2.22-0.07V151.66z M144.9,168.7v-7.4c0.14,0,0.27,0.02,0.43,0.02c0.61,0.05,1.29,0.09,1.81,0.09h0.23l4.05,7.51c0.14,0.29,0.34,0.68,0.81,0.68h3.48c0.38,0,0.66-0.27,0.66-0.66c0-0.07,0-0.23-0.09-0.38l-4.32-8.03c2.44-1.06,3.73-3.12,3.73-5.97v-0.25c0-4.37-3.03-6.74-8.55-6.74c-2.04,0-4.07,0.14-5.63,0.36c-0.5,0.07-1.18,0.27-1.18,1.15v19.62c0,0.5,0.38,0.88,0.88,0.88h2.85C144.51,169.59,144.9,169.2,144.9,168.7L144.9,168.7z"/>
            <path id="Fill-9" fill="#fff" d="M167,169.81c5.43,0,8.17-2.83,8.17-8.37v-12.81c0-0.48-0.38-0.86-0.88-0.86h-2.83c-0.5,0-0.88,0.38-0.88,0.86v12.81c0,3.35-0.91,4.48-3.58,4.48c-2.69,0-3.58-1.13-3.58-4.48v-12.81c0-0.48-0.38-0.86-0.88-0.86h-2.83c-0.5,0-0.88,0.38-0.88,0.86v12.81C158.81,167.01,161.57,169.81,167,169.81"/>
            <path id="Fill-11" fill="#fff" d="M193.23,147.8h-3.15c-0.43,0-0.72,0.36-0.84,0.66l-3.42,8.49c-0.14,0.29-0.2,0.36-0.2,0.38c-0.02-0.02-0.11-0.09-0.23-0.38l-3.42-8.49c-0.11-0.32-0.38-0.68-0.84-0.68h-3.17c-0.43,0-0.77,0.32-0.77,0.75c0,0.09,0.02,0.2,0.09,0.36l4.32,9.89c0.48,1.11,1.02,1.81,1.72,2.15v7.78c0,0.5,0.38,0.88,0.86,0.88h2.85c0.48,0,0.86-0.38,0.86-0.88v-7.78c0.68-0.36,1.22-1.02,1.72-2.15l4.37-9.93c0.02-0.09,0.07-0.16,0.07-0.29C194.05,148.13,193.68,147.8,193.23,147.8"/>
            <path id="Fill-13" fill="#fff" d="M209.7,147.8h-13.98c-0.5,0-0.88,0.38-0.88,0.86v2.26c0,0.48,0.38,0.81,0.88,0.81h4.68v16.99c0,0.5,0.41,0.88,0.88,0.88h2.83c0.48,0,0.88-0.41,0.88-0.88v-16.99h4.68c0.5,0,0.88-0.36,0.88-0.81v-2.26C210.59,148.16,210.2,147.8,209.7,147.8"/>
            <path id="Fill-15" fill="#fff" d="M102.11,174.75c-1.36-0.16-2.67-0.29-5.18-0.29c-2.24,0-7.49,0.91-7.49,9.28v3.53c0,5.91,2.74,9.3,7.49,9.3c2.24,0,3.53-0.16,4.8-0.32l0.36-0.05c0.43-0.05,0.77-0.41,0.77-0.86v-9.59c0-0.5-0.34-0.86-0.79-0.86h-0.29c-0.45,0-0.79,0.36-0.79,0.86v8.8c-0.63,0.07-1.97,0.23-4.03,0.23c-3.67,0-5.59-2.58-5.59-7.47v-3.53c0-6.2,3.05-7.49,5.59-7.49c2.04,0,2.96,0.07,5.05,0.27h0.16c0.5,0,0.75-0.25,0.75-0.75v-0.29C102.88,175.2,102.74,174.81,102.11,174.75"/>
            <path id="Fill-17" fill="#fff" d="M108.71,176.35c0.88-0.07,2.33-0.09,3.37-0.09c4.46,0,6.2,1.2,6.2,4.3v0.14c0,3.21-1.56,4.3-6.2,4.3c-0.41,0-1.15,0-1.9-0.02c-0.54,0-1.09-0.02-1.47-0.02V176.35z M115.25,186.63c3.35-0.7,4.91-2.58,4.91-5.88v-0.14c0-4.3-2.42-6.13-8.08-6.13c-1.24,0-3.46,0.07-4.48,0.11c-0.43,0.05-0.77,0.43-0.77,0.86v20.12c0,0.48,0.36,0.86,0.79,0.86h0.29c0.45,0,0.81-0.36,0.81-0.86v-8.73c0.72,0.02,2.49,0.05,3.37,0.05h1.06l6,9.16c0.11,0.16,0.41,0.38,0.68,0.38h0.36c0.45,0,0.77-0.29,0.77-0.75c0-0.2-0.11-0.43-0.2-0.57L115.25,186.63z"/>
            <path id="Fill-19" fill="#fff" d="M136.73,183.75v3.53c0,4.96-1.92,7.47-5.75,7.47c-3.82,0-5.75-2.51-5.75-7.47v-3.53c0-4.96,1.92-7.47,5.75-7.47C134.8,176.28,136.73,178.8,136.73,183.75 M130.98,174.45c-4.91,0-7.63,3.3-7.63,9.28v3.53c0,6,2.72,9.3,7.63,9.3c4.93,0,7.63-3.3,7.63-9.3v-3.53C138.61,177.76,135.89,174.45,130.98,174.45"/>
            <path id="Fill-21" fill="#fff" d="M155.33,174.59h-0.29c-0.45,0-0.79,0.38-0.79,0.86v13.12c0,4.3-1.61,6.22-5.18,6.22c-3.55,0-5.2-1.97-5.2-6.22v-13.12c0-0.48-0.36-0.86-0.79-0.86h-0.29c-0.43,0-0.79,0.38-0.79,0.86v13.12c0,5.25,2.44,8.01,7.08,8.01c4.62,0,7.06-2.76,7.06-8.01v-13.12C156.14,174.97,155.78,174.59,155.33,174.59"/>
            <path id="Fill-23" fill="#fff" d="M161.96,176.26c0.77-0.05,1.74-0.07,2.81-0.07c4.41,0,6.2,1.27,6.2,4.37v0.48c0,3.33-1.81,4.68-6.2,4.68c-0.86,0-1.97-0.05-2.81-0.09V176.26z M164.76,174.45c-0.93,0-2.29,0.05-3.94,0.14c-0.41,0.05-0.77,0.43-0.77,0.86v20.09c0,0.48,0.34,0.86,0.79,0.86h0.27c0.45,0,0.79-0.36,0.79-0.86v-8.19c0.59,0.05,1.67,0.09,2.81,0.09c5.43,0,8.08-2.1,8.08-6.43v-0.48C172.87,176.51,170.15,174.45,164.76,174.45L164.76,174.45z"/>
            <path id="Fill-25" fill="#fff" d="M116.52,83.42c-14.96,0-27.09,12.08-27.09,27.02c0,14.91,12.13,27,27.09,27s27.09-12.08,27.09-27c0-2.06-0.25-4.07-0.68-6h-20.34c1.54,1.54,2.49,3.67,2.49,6c0,4.71-3.82,8.53-8.55,8.53s-8.55-3.82-8.55-8.53s3.82-8.53,8.55-8.53c1.02,0,2.01,0.18,2.92,0.52l7.83-16.77C123.99,84.23,120.35,83.42,116.52,83.42"/>
         </g>
      </g>
   </g>
</svg>`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    width: MAIN_LOGO_SIZE,
    height: MAIN_LOGO_SIZE * 1.2,
    alignSelf: 'center',
    top: '26%',
    transform: [
      { translateY: -MAIN_LOGO_SIZE * 0.25 }
    ],
  },
  partnerLogoContainer: {
    position: 'absolute',
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerLogoBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: LOGO_SIZE / 2,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  partnerLogo: {
    width: '100%',
    height: '100%',
    borderRadius: LOGO_SIZE / 2,
  },
});

const getPartnerLogoPosition = (angle: number, distance: number, index: number, total: number = 5) => {
  const spacing = width * 0.16;
  const lineWidth = spacing * (total - 1);
  const startX = -lineWidth / 2;
  
  const x = startX + (index % total) * spacing;
  const y = angle === 90 ? -height * 0.21 : height * 0.23; 

  return { x, y };
};

const CustomSplashScreen = ({ onAnimationComplete }: SplashScreenProps) => {
  const partnerScales = partnerLogos.map(() => new Animated.Value(0));
  const floatAnimation = new Animated.Value(0);
  const gradientPosition = new Animated.Value(0);

  useEffect(() => {
    const showSplash = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    };
    showSplash();
  }, []);

  useEffect(() => {
    const mainAnimationDuration = 1500;
    const partnerDelay = 250;
    const partnerAnimationStart = 500;
    const bottomPartnerDelay = 300;

    // Top row (left to right)
    const topPartners = partnerScales.slice(0, 5);
    topPartners.forEach((scale, index) => {
      Animated.sequence([
        Animated.delay(partnerAnimationStart + index * partnerDelay),
        Animated.spring(scale, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    });

    // Bottom row (right to left)
    const bottomPartners = partnerScales.slice(5);
    bottomPartners.reverse().forEach((scale, index) => {
      Animated.sequence([
        Animated.delay(partnerAnimationStart + (topPartners.length * partnerDelay) + bottomPartnerDelay + (index * partnerDelay)),
        Animated.spring(scale, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    });

    const totalDuration = mainAnimationDuration +
      (topPartners.length * partnerDelay) +
      bottomPartnerDelay +
      (bottomPartners.length * partnerDelay) +
      1000;

    setTimeout(async () => {
      await SplashScreen.hideAsync();
      onAnimationComplete();
    }, totalDuration);
  }, []);

  useEffect(() => {
    // Floating animation for main logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        }),
        Animated.timing(floatAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        }),
      ])
    ).start();

    // Animated gradient
    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientPosition, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        }),
        Animated.timing(gradientPosition, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <AnimatedLinearGradient
        colors={['#00847F', '#005752']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.1, y: 1.8 }}
        style={styles.gradient}
      >
        {partnerLogos.map((logo, index) => {
          const position = getPartnerLogoPosition(logo.angle, logo.distance, index);
          return (
            <Animated.View
              key={index}
              style={[
                styles.partnerLogoContainer,
                {
                  transform: [
                    { translateX: position.x },
                    { translateY: position.y },
                    { scale: partnerScales[index] },
                  ],
                  opacity: partnerScales[index],
                },
              ]}
            >
              <View style={styles.partnerLogoBackground}>
                <Image
                  source={logo.source}
                  style={styles.partnerLogo}
                  resizeMode="contain"
                />
              </View>
            </Animated.View>
          );
        })}

        <Animated.View
          style={[
            styles.logo,
            {
              transform: [
                { translateY: floatAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-MAIN_LOGO_SIZE * 0.25, -MAIN_LOGO_SIZE * 0.28]
                }) }
              ]
            }
          ]}
        >
          <SvgXml xml={colruytLogoSvg} width="100%" height="100%" />
        </Animated.View>
      </AnimatedLinearGradient>
    </View>
  );
};

export default CustomSplashScreen;
