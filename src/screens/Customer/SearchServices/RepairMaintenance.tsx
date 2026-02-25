import React from 'react';
import CategoryLayout from './CategoryLayout';

export default function RepairMaintenance() {
  return (
    <CategoryLayout
      title="Repair"
      layout="grid"
      items={[
        { title: 'Computer Repair', image: require('../../../Images/serachImg/Computer.png') },
        { title: 'Mobile Repair', image: require('../../../Images/serachImg/Mobile.png') },
        { title: 'Software installation', image: require('../../../Images/serachImg/Software.png') },
        { title: 'Internet Setup', image: require('../../../Images/serachImg/Internet.png') },
      ]}
    />
  );
}