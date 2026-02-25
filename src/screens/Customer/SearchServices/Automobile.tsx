import React from 'react';
import CategoryLayout from './CategoryLayout';

export default function Automobile() {
  return (
    <CategoryLayout
      title="Automobile"
      layout="grid"
      items={[
        { title: 'Car Wash', image: require('../../../Images/serachImg/Car.png') },
        { title: 'Bike Services', image: require('../../../Images/serachImg/Bike.png') },
        { title: 'Car Repair', image: require('../../../Images/serachImg/CarRepair.png') },
        { title: 'Battery Jumpstart', image: require('../../../Images/serachImg/Battery.png') },
      ]}
    />
  );
}