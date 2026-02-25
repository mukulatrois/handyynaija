import React from 'react';
import CategoryLayout from './CategoryLayout';

export default function MediaEvent() {
  return (
    <CategoryLayout
      title="Media & Events"
      layout="grid"
      items={[
        { title: 'Photo/Video grapher', image: require('../../../Images/serachImg/Photo.png') },
        { title: 'Birthday/ Event Planner', image: require('../../../Images/serachImg/Birthday.png') },
        { title: 'DJ & Sounds Setup', image: require('../../../Images/serachImg/Sounds.png') },
        { title: 'MC', image: require('../../../Images/serachImg/MC.png') },
        { title: 'Comedian', image: require('../../../Images/serachImg/Comedian.png') },
      ]}
    />
  );
}