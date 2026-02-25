import React from 'react';
import CategoryLayout from './CategoryLayout';

export default function TechIT() {
  return (
    <CategoryLayout
      title="Tech & IT Support"
      layout="grid"
      items={[
        { title: 'Electrician', image: require('../../../Images/serachImg/Electrician.png') },
        { title: 'Plumber', image: require('../../../Images/serachImg/Plumber.png') },
        { title: 'Appliances', image: require('../../../Images/serachImg/Appliances.png') },
        { title: 'AC Servicing', image: require('../../../Images/serachImg/AC.png') },
      ]}
    />
  );
}