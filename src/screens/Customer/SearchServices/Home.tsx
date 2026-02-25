import React from 'react';
import CategoryLayout from './CategoryLayout';

export default function Home() {
  return (
    <CategoryLayout
      title="Home"
      layout="grid"
      items={[
        { title: 'Cleaning', image: require('../../../Images/serachImg/Cleaning.png') },
        { title: 'Ironing', image: require('../../../Images/serachImg/ironing.png') },
        { title: 'Handyman', image: require('../../../Images/serachImg/Handyman.png') },
        { title: 'Painting', image: require('../../../Images/serachImg/Painting.png') },
        { title: 'Interior Design', image: require('../../../Images/serachImg/interior.png') },
        { title: 'Pest Control', image: require('../../../Images/serachImg/PestControl.png') },
        { title: 'Kitchen Installation', image: require('../../../Images/serachImg/Kitchen.png') },
      ]}
    />
  );
}