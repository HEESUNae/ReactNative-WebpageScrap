import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const Icon = ({ name, size, color, onPress }) => {
  return <Ionicons name={name} size={size} color={color} onPress={onPress} />;
};

export default Icon;
