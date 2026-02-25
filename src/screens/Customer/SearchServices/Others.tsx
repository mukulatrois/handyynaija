import React from 'react'
import CategoryLayout from './CategoryLayout';

export default function Others() {
  return (
    <CategoryLayout
      title="Others"
      layout="grid"
      items={[
        { title: 'House Shifting', image: require('../../../Images/serachImg/houseShifting.png') },
        { title: 'Pickup and Delivery', image: require('../../../Images/serachImg/Delivery.png') },
      ]}
    />
  );
}