import { View, StyleSheet, Image,Animated } from 'react-native';
import { useEffect,useRef  } from 'react';
import { router } from 'expo-router';


export default function SplashScreen() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Run animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

return (
  <View style={styles.container}>
      <Animated.View style={[styles.logo, {
        transform: [{ scale: scaleAnim }],
        opacity: fadeAnim,
      }]}>
      <Image source={require('assets/images/CC.png')} style={styles.logo}/>
      </Animated.View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    elevation: 6,
  },
  logoText: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  logo: {
    width: 400,
    height: 500,
    resizeMode: 'contain',
    alignContent: 'center',
    
  },
  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#f97316',
    marginBottom: 6,
  },
  tagline: {
    fontSize: 14,
    color: '#555',
    letterSpacing: 1,
  },
});