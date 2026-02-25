import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { fontSize } from '../utils/responsive';

import SearchScreen from '../screens/Customer/SearchServices/SearchScreen';
import FavoritesScreen from '../screens/Customer/Service/FavoritesScreen';
import ServicesScreen from '../screens/Customer/Service/ServicesScreen';
import InboxScreen from '../screens/Customer/Service/InboxScreen';
import MyAccountScreen from '../screens/Customer/profile/MyAccountScreen';

export type TabParamList = {
  Search: undefined;
  Favorites: undefined;
  Services: undefined;
  Inbox: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#3FA565',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: styles.label,

        tabBarIcon: ({ color }) => {
          let iconName: string = '';

           if (route.name === 'Search') iconName = 'search-outline';
          if (route.name === 'Favorites') iconName = 'heart-outline';
          if (route.name === 'Services') iconName = 'calendar-outline';
          if (route.name === 'Inbox') iconName = 'chatbubble-outline';
          if (route.name === 'Profile') iconName = 'person-outline';

          return <Icon name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ tabBarLabel: 'Search' }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ tabBarLabel: 'Favorites' }}
      />

      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{ tabBarLabel: 'Services' }}
      />

      <Tab.Screen
        name="Inbox"
        component={InboxScreen}
        options={{ tabBarLabel: 'Inbox' }}
      />
      
      <Tab.Screen
        name="Profile"
        component={MyAccountScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: fontSize(12),
    fontWeight: '600',
    marginBottom: 6,
  },
});
