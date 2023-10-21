import React from 'react';
import { Pressable } from 'react-native';

const Button = (props) => {
  return (
    <Pressable {...props} onPress={props.onPress}>
      {props.children}
    </Pressable>
  );
};

export default Button;
