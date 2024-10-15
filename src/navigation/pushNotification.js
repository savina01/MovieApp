import messaging from '@react-native-firebase/messaging';

useEffect(() => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    Alert.alert('A new movie is added!', remoteMessage.notification.body);
  });

  return unsubscribe;
}, []);
