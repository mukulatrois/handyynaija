import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ServicesUpcomingScreen from '../screens/Customer/Service/ServicesUpcomingScreen';
import ServicesPastScreen from '../screens/Customer/Service/ServicesPastScreen';
import ServicesCanceledScreen from '../screens/Customer/Service/ServicesCanceledScreen';

const Tab = createMaterialTopTabNavigator();

export default function TopServiceTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#999',
        tabBarIndicatorStyle: { backgroundColor: '#3FA565' },
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
      }}
    >
      <Tab.Screen name="Upcoming" component={ServicesUpcomingScreen} />
      <Tab.Screen name="Past" component={ServicesPastScreen} />
      <Tab.Screen name="Canceled" component={ServicesCanceledScreen} />
    </Tab.Navigator>
  );
}
