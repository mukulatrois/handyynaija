import React from 'react';
import CategoryLayout from './CategoryLayout';
import { navigate } from '../../../navigation/navigationService';

const TECH_ITEMS = [
  { title: 'Electrician', image: require('../../../Images/serachImg/Electrician.png') },
  { title: 'Plumber', image: require('../../../Images/serachImg/Plumber.png') },
  { title: 'Appliances', image: require('../../../Images/serachImg/Appliances.png') },
  { title: 'AC Servicing', image: require('../../../Images/serachImg/AC.png') },
];

export default function TechIT() {
  return (
    <CategoryLayout
      title="Tech & IT Support"
      layout="grid"
      items={TECH_ITEMS}
      onItemPress={(item) => navigate('SelectDateTime', { serviceTitle: item.title })}
    />
  );
}