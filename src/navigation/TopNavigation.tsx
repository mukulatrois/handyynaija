import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MessageScreen from '../screens/Customer/inbox/Message';
import AlertMessageScreen from '../screens/Customer/inbox/AlertMessage';

const Tab = createMaterialTopTabNavigator();

export default function InboxTopTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#3FA565',
        tabBarInactiveTintColor: '#999',
        tabBarIndicatorStyle: { backgroundColor: '#3FA565' },
        tabBarStyle: { backgroundColor: '#fff' },
      }}
    >
      <Tab.Screen name="Chat" component={MessageScreen} />
      <Tab.Screen name="Alerts" component={AlertMessageScreen} />
    </Tab.Navigator>
  );
}
