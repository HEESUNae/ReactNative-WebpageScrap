import React from 'react';
import { View } from 'react-native';

const Spacer = ({ size, horizontal }) => {
  if (horizontal) {
    return <View style={{ marginLeft: size }} />;
  }
  return <View style={{ marginTop: size }} />;
};

export default Spacer;
