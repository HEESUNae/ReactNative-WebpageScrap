import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Header from '../components/header/Header';
import SingleLineInput from '../components/SingleLineInput';
import Typography from '../components/Typography';
import Button from '../components/Button';
import Spacer from '../components/Spacer';

const AddLinkScreen = () => {
  const navigation = useNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const [url, setUrl] = useState('');

  const onPressClose = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="ADD LINK" />
        <Header.Icon name={'close'} size={20} color={'white'} onPress={onPressClose} />
      </Header>
      <View style={styles.inputWrap}>
        <SingleLineInput value={url} onChangeText={setUrl} placeholder={'https://example.com'} />
      </View>
      <Button>
        <View
          style={{
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: url === '' ? 'gray' : 'black',
          }}
        >
          <Typography color={'white'} size={18}>
            저장하기
          </Typography>
        </View>
        <View style={{ backgroundColor: url === '' ? 'gray' : 'black' }}>
          <Spacer size={safeAreaInset.bottom} />
        </View>
      </Button>
    </View>
  );
};

export default AddLinkScreen;

const styles = StyleSheet.create({
  inputWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
});
