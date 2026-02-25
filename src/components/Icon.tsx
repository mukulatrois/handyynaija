import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextStyle } from 'react-native';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: TextStyle;
}

export default function CustomIcon({ name, size = 20, color = '#000', style }: IconProps) {
  return <Icon name={name} size={size} color={color} style={style} />;
}

// Icon name mappings for common icons
export const IconNames = {
  search: 'search-outline',
  notifications: 'notifications-outline',
  heart: 'heart',
  heartOutline: 'heart-outline',
  arrowBack: 'arrow-back',
  arrowForward: 'chevron-forward',
  close: 'close',
  checkmark: 'checkmark',
  person: 'person-outline',
  calendar: 'calendar-outline',
  home: 'home-outline',
  share: 'share-outline',
  business: 'business-outline',
  refresh: 'refresh-outline',
  cash: 'cash-outline',
  star: 'star',
  camera: 'camera-outline',
  image: 'image-outline',
  document: 'document-outline',
  send: 'send',
  menu: 'ellipsis-vertical',
  plus: 'add',
  clipboard: 'clipboard-outline',
  chatbubble: 'chatbubble-outline',
};
