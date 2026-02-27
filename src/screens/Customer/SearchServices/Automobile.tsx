import React from 'react';
import CategoryLayout from './CategoryLayout';
import { navigate } from '../../../navigation/navigationService';

const AUTO_ITEMS = [
  { title: 'Car Wash', image: require('../../../Images/serachImg/Car.png') },
  { title: 'Bike Services', image: require('../../../Images/serachImg/Bike.png') },
  { title: 'Car Repair', image: require('../../../Images/serachImg/CarRepair.png') },
  { title: 'Battery Jumpstart', image: require('../../../Images/serachImg/Battery.png') },
];

export default function Automobile() {
  return (
    <CategoryLayout
      title="Automobile"
      layout="grid"
      items={AUTO_ITEMS}
      onItemPress={(item) => navigate('SelectDateTime', { serviceTitle: item.title })}
    />
  );
}