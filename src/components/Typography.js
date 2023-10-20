import { Text } from 'react-native';
import React from 'react';

const Typography = ({ size, color, weight, children }) => {
  return <Text style={{ fontSize: size, color: color, fontWeight: weight }}>{children}</Text>;
};

export default Typography;
