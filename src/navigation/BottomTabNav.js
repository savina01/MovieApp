import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MoviesListScreen from './MoviesListScreen';
import ProfileScreen from '../components/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="MoviesList" component={MoviesListScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
