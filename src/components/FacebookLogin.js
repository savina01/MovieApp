import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState(null);

  const onFacebookButtonPress = async () => {
    const result = await LoginManager.logInWithPermissions(['public_profile']);
    
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    return auth().signInWithCredential(facebookCredential);
  };

  return (
    <View>
      <Button
        title="Login with Facebook"
        onPress={() => onFacebookButtonPress().then(user => {
          setUser(user);
          navigation.navigate('MoviesList');
        })}
      />
      {user && <Text>Welcome {user.displayName}</Text>}
    </View>
  );
}
