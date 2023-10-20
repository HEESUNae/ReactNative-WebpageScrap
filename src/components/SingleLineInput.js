import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

const SingleLineInput = ({ value, onChangeText, placeholder, style, fontSize }) => {
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={{
        alignSelf: 'stretch',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: focused ? 'black' : 'gray',
      }}
    >
      <TextInput
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[style, { fontSize: fontSize ?? 20 }]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

export default SingleLineInput;
