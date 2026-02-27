import React from 'react';
import CategoryLayout from './CategoryLayout';
import { navigate } from '../../../navigation/navigationService';

const OTHERS_ITEMS = [
  { title: 'House Shifting', image: require('../../../Images/serachImg/houseShifting.png') },
  { title: 'Pickup and Delivery', image: require('../../../Images/serachImg/Delivery.png') },
];

export default function Others() {
  return (
    <CategoryLayout
      title="Others"
      layout="grid"
      items={OTHERS_ITEMS}
      onItemPress={(item) => navigate('SelectDateTime', { serviceTitle: item.title })}
    />
  );
}