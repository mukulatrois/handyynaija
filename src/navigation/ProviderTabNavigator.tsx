import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { fontSize } from '../utils/responsive';

import PCalendar from '../screens/Provider/PCalendar';
import PRequests from '../screens/Provider/PRequests';
import PInbox from '../screens/Provider/PInbox';
import PListings from '../screens/Provider/PListings';
import PProfile from '../screens/Provider/PProfile';
import { COLORS } from '../utils/constants';

export type ProviderTabParamList = {
  Calendar: undefined;
  Requests: undefined;
  Inbox: undefined;
  Listings: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<ProviderTabParamList>();

export default function ProviderTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.SECONDARY,
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: styles.label,

        tabBarIcon: ({ color }) => {
          let iconName: string = '';

          if (route.name === 'Calendar') iconName = 'calendar-outline';
          if (route.name === 'Requests') iconName = 'document-text-outline';
          if (route.name === 'Inbox') iconName = 'chatbubble-outline';
          if (route.name === 'Listings') iconName = 'list-outline';
          if (route.name === 'Profile') iconName = 'person-outline';

          return <Icon name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Calendar"
        component={PCalendar}
        options={{ tabBarLabel: 'Calendar' }}
      />

      <Tab.Screen
        name="Requests"
        component={PRequests}
        options={{ tabBarLabel: 'Requests' }}
      />

      <Tab.Screen
        name="Inbox"
        component={PInbox}
        options={{ tabBarLabel: 'Inbox' }}
      />

      <Tab.Screen
        name="Listings"
        component={PListings}
        options={{ tabBarLabel: 'Listings' }}
      />

      <Tab.Screen
        name="Profile"
        component={PProfile}
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
