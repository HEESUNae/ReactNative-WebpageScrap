import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSetRecoilState } from 'recoil';

import { atomLinkList } from '../states/atomLinkList';

import Header from '../components/header/Header';
import SingleLineInput from '../components/SingleLineInput';
import Typography from '../components/Typography';
import Button from '../components/Button';
import Spacer from '../components/Spacer';

const AddLinkScreen = () => {
  const navigation = useNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const updateList = useSetRecoilState(atomLinkList);
  const [url, setUrl] = useState('');

  // 화면 닫기
  const onPressClose = () => {
    navigation.goBack();
  };

  const onPressSave = useCallback(() => {
    if (url === '') return;
    updateList((prev) => {
      const list = [
        {
          title: '',
          image: '',
          link: url,
          createdAt: new Date().toISOString(),
        },
      ];
      return {
        list: list.concat(prev.list),
      };
    });
    setUrl('');
    onPressClose();
  }, [url]); // url 변경되면 실행

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="ADD LINK" />
        <Header.Icon name={'close'} size={20} color={'white'} onPress={onPressClose} />
      </Header>
      <View style={styles.inputWrap}>
        <SingleLineInput value={url} onChangeText={setUrl} placeholder={'https://example.com'} />
      </View>
      <Button onPress={onPressSave}>
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
