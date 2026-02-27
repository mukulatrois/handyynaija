import React from 'react';
import CategoryLayout from './CategoryLayout';
import { navigate } from '../../../navigation/navigationService';

const BEAUTY_ITEMS = [
  { title: 'Salon at home', image: require('../../../Images/serachImg/Salon.png') },
  { title: 'Manicure & Pedicure', image: require('../../../Images/serachImg/Manicure.png') },
  { title: 'Haircut & Styling', image: require('../../../Images/serachImg/Haircut.png') },
];

export default function Beauty() {
  return (
    <CategoryLayout
      title="Beauty"
      layout="grid"
      items={BEAUTY_ITEMS}
      onItemPress={(item) => navigate('SelectDateTime', { serviceTitle: item.title })}
    />
  );
}