import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator, View, Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import MoviesListScreen from './src/components/MovieList';
import MovieDetailsScreen from './src/components/MovieDetailsScreen';
import LoginScreen from './src/components/LoginScreen';
import ProfileScreen from './src/components/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MovieList" component={MoviesListScreen} options={{ title: 'Movies' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  MovieDetails: { movie: { name: string; id: string; genre: string; year: string; cover_photo: string; summary: string; } };
  Movies: undefined;
};

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const navigationRef = React.createRef<NavigationContainerRef<RootStackParamList>>();

  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.notification) {
        Alert.alert('A new movie is added!', remoteMessage.notification.title || '');
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log('Setting up onAuthStateChanged');
    const subscriber = auth().onAuthStateChanged((user) => {
      console.log('Auth state changed:', user);
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, [initializing]);

  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(async remoteMessage => {
      if (remoteMessage.notification && remoteMessage.data && remoteMessage.data.movieId) {
        console.log('Notification caused app to open from background:', remoteMessage.notification);

        // Fetch movie details from your backend
        const movieId = remoteMessage.data.movieId.toString();
        const response = await fetch(`http://10.0.2.2:8000/movies/${movieId}`);
        const movie = await response.json();

        navigationRef.current?.navigate('MovieDetails', { movie });
      }
    });

    messaging().getInitialNotification().then(async remoteMessage => {
      if (remoteMessage?.notification && remoteMessage.data && remoteMessage.data.movieId) {
        console.log('Notification caused app to open from quit state:', remoteMessage.notification);

        const movieId = remoteMessage.data.movieId.toString();
        const response = await fetch(`http://10.0.2.2:8000/movies/${movieId}`);
        const movie = await response.json();

        navigationRef.current?.navigate('MovieDetails', { movie });
      }
    });

    return unsubscribe;
   }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Login">
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
            <Stack.Screen name="Movies" component={MoviesListScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
