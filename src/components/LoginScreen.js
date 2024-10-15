import React, { useState, useEffect } from 'react';
import { View, Button, Text, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { AccessToken, LoginManager, Profile } from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [initializing, setInitializing] = useState(true); 
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log('Checking user state on mount');
    const subscriber = auth().onAuthStateChanged((user) => {
      console.log('Auth state changed:', user);
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber; 
  }, [initializing]);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('authToken');
      console.log('Token from storage:', token);
      if (token) {
        setUser({ displayName: 'Authenticated User' });
      }
      setInitializing(false);
    };
    checkToken();
  }, []);

  useEffect(() => {
    if (user) {
      navigation.navigate('Profile');  
    }
  }, [user, navigation]);

  const validateEmailAndPassword = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Both email and password are required.');
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const sendLoginInfoToBackend = async (email, password) => {
    try {
      const response = await fetch('http://your-backend-endpoint.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log('Backend response:', data);
      return data;  
    } catch (error) {
      console.error('Error sending login info to backend:', error);
      Alert.alert('Error', 'Failed to connect to the backend.');
      setLoading(false); 
    }
  };

  const onFacebookButtonPress = async () => {
    try {
      setLoading(true);
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        setLoading(false);
        throw 'User cancelled the login process';
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        setLoading(false);
        throw 'Something went wrong obtaining access token';
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      const userCredential = await auth().signInWithCredential(facebookCredential);

      const accessToken = await userCredential.user.getIdToken();
      console.log('Firebase Access Token:', accessToken);

      await AsyncStorage.setItem('authToken', accessToken);

      Profile.getCurrentProfile().then(async currentProfile => {
        if (currentProfile) {
          const profileData = {
            username: userCredential.user.uid,
            full_name: currentProfile.name,
            email: userCredential.user.email,
            facebook_id: currentProfile.userID,
          };

          await axios.post('http://10.0.2.2:8000/update-profile', profileData, {
            headers: { Authorization: `Bearer ${await userCredential.user.getIdToken()}` },
          });
        }
      });

      setUser(userCredential.user);
      setLoading(false);
      navigation.navigate('MovieList');  

    } catch (error) {
      console.error(error);
      Alert.alert('Login failed', error.message);
      setLoading(false);
    }
  };

  const onEmailLoginPress = async () => {
    if (!validateEmailAndPassword()) return;

    try {
      setLoading(true);
      const backendResponse = await sendLoginInfoToBackend(email, password);
      if (backendResponse && backendResponse.token) {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        await AsyncStorage.setItem('authToken', backendResponse.token);  

        setUser(userCredential.user);
        setLoading(false);
      } else {
        throw new Error('Invalid login details.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie App</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.fbButton}
        onPress={onFacebookButtonPress}
      >
        <Text style={styles.fbButtonText}>Login with Facebook</Text>
      </TouchableOpacity>
      <Button
        title="Login with Email"
        onPress={onEmailLoginPress}
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  fbButton: {
    backgroundColor: '#4267B2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 12,
  },
  fbButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
