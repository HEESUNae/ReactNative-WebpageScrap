import React from 'react';
import Icon from '../Icon';

const HeaderIcon = ({ name, size, color, onPress }) => {
  return <Icon name={name} size={size} color={color} onPress={onPress} />;
};

export default HeaderIcon;
