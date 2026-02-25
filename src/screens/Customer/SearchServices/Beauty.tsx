import React from 'react';
import CategoryLayout from './CategoryLayout';

export default function Beauty() {
  return (
    <CategoryLayout
      title="Beauty"
      layout="grid"
      items={[
        { title: 'Salon at home', image: require('../../../Images/serachImg/Salon.png') },
        { title: 'Manicure & Pedicure', image: require('../../../Images/serachImg/Manicure.png') },
        { title: 'Haircut & Styling', image: require('../../../Images/serachImg/Haircut.png') },
      ]}
    />
  );
}