import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MessageScreen from '../screens/Customer/inbox/Message';
import AlertMessageScreen from '../screens/Customer/inbox/AlertMessage';
import { COLORS } from '../utils/constants';

const Tab = createMaterialTopTabNavigator();

export default function InboxTopTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: '#999',
        tabBarIndicatorStyle: { backgroundColor: COLORS.PRIMARY },
        tabBarStyle: { backgroundColor: '#fff' },
      }}
    >
      <Tab.Screen name="Chat" component={MessageScreen} />
      <Tab.Screen name="Alerts" component={AlertMessageScreen} />
    </Tab.Navigator>
  );
}
