import React from 'react';
import CategoryLayout from './CategoryLayout';
import { navigate } from '../../../navigation/navigationService';

const MEDIA_ITEMS = [
  { title: 'Photo/Video grapher', image: require('../../../Images/serachImg/Photo.png') },
  { title: 'Birthday/ Event Planner', image: require('../../../Images/serachImg/Birthday.png') },
  { title: 'DJ & Sounds Setup', image: require('../../../Images/serachImg/Sounds.png') },
  { title: 'MC', image: require('../../../Images/serachImg/MC.png') },
  { title: 'Comedian', image: require('../../../Images/serachImg/Comedian.png') },
];

export default function MediaEvent() {
  return (
    <CategoryLayout
      title="Media & Events"
      layout="grid"
      items={MEDIA_ITEMS}
      onItemPress={(item) => navigate('SelectDateTime', { serviceTitle: item.title })}
    />
  );
}