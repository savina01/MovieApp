import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { AccessToken } from 'react-native-fbsdk-next';
import axios from 'axios';

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const token = await user.getIdToken();
          console.log("User token:", token);

          const fbAccessToken = (await AccessToken.getCurrentAccessToken())?.accessToken;
          let email = user.email;
          let fullName = null;
          let username = null;
          let profilePicture = null;

          if (fbAccessToken) {
            const fbResponse = await axios.get(`https://graph.facebook.com/me?fields=email,name,id,picture.type(large)&access_token=${fbAccessToken}`);
            email = fbResponse.data.email || email;
            fullName = fbResponse.data.name || profile.full_name;
            username = fbResponse.data.id || profile.username;
            profilePicture = fbResponse.data.picture?.data?.url;
          }

          const response = await axios.get('http://10.0.2.2:8000/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });

          setProfile({ ...response.data, email, full_name: fullName, username, profile_picture: profilePicture });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>Error loading profile</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {profile.profile_picture && <Image source={{ uri: profile.profile_picture }} style={styles.profilePicture} />}
      <Text style={styles.name}>{profile.full_name}</Text>
      <Text style={styles.username}>Username: {profile.username}</Text>
      <Text style={styles.field}>Email: {profile.email}</Text>
      <Button title="Logout" onPress={handleLogout} style={styles.logoutButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  username: {
    fontSize: 20,
    color: '#777',
    marginBottom: 2,
  },
  field: {
    fontSize: 20,
    marginVertical: 8,
  },
  logoutButton: {
    marginTop: 30,
    alignSelf: 'stretch',
    backgroundColor: '#f0f8ff',
  },
});

export default ProfileScreen;
